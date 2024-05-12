import {
  Address,
  Assets,
  CostModels,
  Credential,
  Datum,
  DatumHash,
  Delegation,
  OutRef,
  ProtocolParameters,
  Provider,
  RewardAddress,
  Transaction,
  TxHash,
  Unit,
  UTxO,
} from "../types/mod.ts";
import { C } from "../core/mod.ts";
import { costModelKeys, fromHex, fromUnit, toHex } from "../utils/mod.ts";
import * as ogmios from "@cardano-ogmios/schema";

function fromMaybeBuffer(x: string | Buffer) {
  if (typeof x === "string") {
    return x;
  } else {
    return x.toString();
  }
}

function fromOgmiosValue(value: ogmios.Value): Assets {
  const assets: Assets = {};
  for (const policy_id of Object.keys(value)) {
    if (policy_id == "ada") {
      assets["lovelace"] = value[policy_id].lovelace;
    } else {
      for (const token_name of Object.keys(value[policy_id])) {
        assets[policy_id + token_name] = value[policy_id][token_name];
      }
    }
  }
  return assets;
}

export class Kupmios implements Provider {
  kupoUrl: string;
  ogmiosUrl: string;
  headers?: any; //TODO: fix this type not sure what the header should be

  /**
   * This provider is based on Kupo + Ogmios v6.
   * This is a way to support both ogmios 5.6 and 6.0 until 6.0 is released as stable and the Conway hard-fork is done.
   * @param kupoUrl: http(s)://localhost:1442
   * @param ogmiosUrl: ws(s)://localhost:1337
   */
  constructor(kupoUrl: string, ogmiosUrl: string, headers?: any) {
    this.kupoUrl = kupoUrl;
    this.ogmiosUrl = ogmiosUrl;
    this.headers = headers;
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    const client = await this.ogmiosWsp(
      "queryLedgerState/protocolParameters",
      {},
    );

    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg: MessageEvent<string | Buffer>): unknown => {
          //console.log("queryLedgerState/protocolParameters", msg.data);
          try {
            const {
              result,
            }: ogmios.QueryLedgerStateProtocolParametersResponse = JSON.parse(
              fromMaybeBuffer(msg.data),
            );

            // deno-lint-ignore no-explicit-any
            const costModels: CostModels = {
              PlutusV1: Object.fromEntries(
                result.plutusCostModels!["plutus:v1"].map((val, idx) => [
                  costModelKeys.PlutusV1[idx],
                  val,
                ]),
              ),
              PlutusV2: Object.fromEntries(
                result.plutusCostModels!["plutus:v2"].map((val, idx) => [
                  costModelKeys.PlutusV2[idx],
                  val,
                ]),
              ),
            };
            const [memNum, memDenom] =
              result.scriptExecutionPrices!.memory.split("/");
            const [stepsNum, stepsDenom] =
              result.scriptExecutionPrices!.cpu.split("/");
            const protocolParams: ProtocolParameters = {
              minFeeA: result.minFeeCoefficient,
              minFeeB: Number(result.minFeeConstant.ada.lovelace),
              maxTxSize: result.maxTransactionSize!.bytes,
              maxValSize: result.maxValueSize!.bytes,
              keyDeposit: BigInt(result.stakeCredentialDeposit.ada.lovelace),
              poolDeposit: BigInt(result.stakePoolDeposit.ada.lovelace),
              priceMem: [BigInt(memNum), BigInt(memDenom)],
              priceStep: [BigInt(stepsNum), BigInt(stepsDenom)],
              maxTxExMem: BigInt(
                result.maxExecutionUnitsPerTransaction!.memory,
              ),
              maxTxExSteps: BigInt(result.maxExecutionUnitsPerTransaction!.cpu),
              coinsPerUtxoByte: BigInt(result.minUtxoDepositCoefficient),
              collateralPercentage: result.collateralPercentage!,
              maxCollateralInputs: result.maxCollateralInputs!,
              costModels,
            };
            res(protocolParams);
            client.close();
          } catch (e) {
            rej(e);
          }
          return undefined as unknown;
        },
        { once: true },
      );
    });
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
      const isAddress = typeof addressOrCredential === "string";
      const queryPredicate = isAddress
        ? addressOrCredential
        : addressOrCredential.hash;
      const result = await fetch(
        `${this.kupoUrl}/matches/${queryPredicate}${
          isAddress ? "" : "/*"
        }?unspent`,
      ).then((res) => res.json());
      return this.kupmiosUtxosToUtxos(result);
    }

  async getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]> {
    const isAddress = typeof addressOrCredential === "string";
    const queryPredicate = isAddress
      ? addressOrCredential
      : addressOrCredential.hash;
    const { policyId, assetName } = fromUnit(unit);
    const result = (await fetch(
      `${this.kupoUrl}/matches/${queryPredicate}${
        isAddress ? "" : "/*"
      }?unspent&policy_id=${policyId}${
        assetName ? `&asset_name=${assetName}` : ""
      }`,
      {
        headers: this.headers,
      },
    ).then((res) => res.json())) as unknown as {
      transaction_id: string;
      output_index: number;
    }[];
    return await this.getUtxosByOutRef(
      result.map((x) => {
        return { txHash: x.transaction_id, outputIndex: x.output_index };
      }),
    );
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const { policyId, assetName } = fromUnit(unit);
    const result = (await fetch(
      `${this.kupoUrl}/matches/${policyId}.${
        assetName ? `${assetName}` : "*"
      }?unspent`,
      {
        headers: this.headers,
      },
    ).then((res) => res.json())) as unknown as {
      transaction_id: string;
      output_index: number;
    }[];

    if (result.length > 1) {
      throw new Error("Unit needs to be an NFT or only held by one address.");
    }
    return (
      await this.getUtxosByOutRef(
        result.map((x) => {
          return { txHash: x.transaction_id, outputIndex: x.output_index };
        }),
      )
    )[0];
  }

  async getUtxosByOutRef(outRefs: Array<OutRef>): Promise<UTxO[]> {
    const queryHashes = [...new Set(outRefs.map((outRef) => outRef.txHash))];

    const utxos = await Promise.all(
      queryHashes.map(async (txHash) => {
        const result = await fetch(
          `${this.kupoUrl}/matches/*@${txHash}?unspent`,
        ).then((res) => res.json());
        return this.kupmiosUtxosToUtxos(result);
      }),
    );

    return utxos
      .reduce((acc, utxos) => acc.concat(utxos), [])
      .filter((utxo) =>
        outRefs.some(
          (outRef) =>
            utxo.txHash === outRef.txHash &&
            utxo.outputIndex === outRef.outputIndex,
        ),
      );
  }

  async getDelegation(rewardAddress: RewardAddress): Promise<Delegation> {
    const client = await this.ogmiosWsp(
      "queryLedgerState/rewardAccountSummaries",
      {
        keys: [rewardAddress],
      },
    );

    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg: MessageEvent<string | Buffer>) => {
          try {
            const { result } = JSON.parse(fromMaybeBuffer(msg.data));
            const delegation = (result ? Object.values(result)[0] : {}) as {
              delegate: string;
              rewards: number;
            };
            res({
              poolId: delegation?.delegate || null,
              rewards: BigInt(delegation?.rewards || 0),
            });
            client.close();
          } catch (e) {
            rej(e);
          }
        },
        { once: true },
      );
    });
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const result: { datum: string } | undefined = (await fetch(
      `${this.kupoUrl}/datums/${datumHash}`,
      {
        headers: this.headers,
      },
    ).then((res) => res.json())) as any;
    if (!result || !result.datum) {
      throw new Error(`No datum found for datum hash: ${datumHash}`);
    }
    return result.datum;
  }

  awaitTx(txHash: TxHash, checkInterval = 3000): Promise<boolean> {
    return new Promise((res) => {
      const confirmation = setInterval(async () => {
        const isConfirmed = await fetch(
          `${this.kupoUrl}/matches/*@${txHash}?unspent`,
          {
            headers: this.headers,
          },
        ).then((res) => res.json());
        if (isConfirmed && Object.keys(isConfirmed).length > 0) {
          clearInterval(confirmation);
          await new Promise((res) => setTimeout(() => res(1), 1000));
          return res(true);
        }
      }, checkInterval);
    });
  }

  async submitTx(tx: Transaction): Promise<TxHash> {
    const client = await this.ogmiosWsp("submitTransaction", {
      transaction: { cbor: tx },
    });

    return new Promise((res, rej) => {
      client.addEventListener(
        "message",
        (msg: MessageEvent<string | Buffer>) => {
          try {
            const response = JSON.parse(fromMaybeBuffer(msg.data));
            if ("result" in response) res(response.result.transaction.id);
            else rej(response.error);
            client.close();
          } catch (e) {
            rej(e);
          }
        },
        { once: true },
      );
    });
  }

  private async ogmiosWsp(
    method: string,
    params = {},
    id?: string,
  ): Promise<WebSocket> {
    const client = new WebSocket(this.ogmiosUrl);
    await new Promise((res) => {
      client.addEventListener("open", () => res(1), { once: true });
    });
    client.send(
      JSON.stringify({
        jsonrpc: "2.0",
        method,
        params,
        id,
      }),
    );
    return client;
  }

  private kupmiosUtxosToUtxos(utxos: unknown): Promise<UTxO[]> {
    // deno-lint-ignore no-explicit-any
    return Promise.all(
      (utxos as any).map(async (utxo: any) => {
        return {
          txHash: utxo.transaction_id,
          outputIndex: parseInt(utxo.output_index),
          address: utxo.address,
          assets: (() => {
            const a: Assets = { lovelace: BigInt(utxo.value.coins) };
            Object.keys(utxo.value.assets).forEach((unit) => {
              a[unit.replace(".", "")] = BigInt(utxo.value.assets[unit]);
            });
            return a;
          })(),
          datumHash: utxo?.datum_type === "hash" ? utxo.datum_hash : null,
          datum:
            utxo?.datum_type === "inline"
              ? await this.getDatum(utxo.datum_hash)
              : null,
          scriptRef:
            utxo.script_hash &&
            (await (async () => {
              const { script, language } = await fetch(
                `${this.kupoUrl}/scripts/${utxo.script_hash}`,
              ).then((res) => res.json());

              if (language === "native") {
                return { type: "Native", script };
              } else if (language === "plutus:v1") {
                return {
                  type: "PlutusV1",
                  script: toHex(
                    C.PlutusV1Script.new(fromHex(script)).to_bytes(),
                  ),
                };
              } else if (language === "plutus:v2") {
                return {
                  type: "PlutusV2",
                  script: toHex(
                    C.PlutusV2Script.new(fromHex(script)).to_bytes(),
                  ),
                };
              }
            })()),
        } as UTxO;
      }),
    );
  }
}

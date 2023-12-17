import { C } from '../core/mod.ts'
import { Data } from '../mod.ts'
import {
  Address,
  Assets,
  CertificateValidator,
  Datum,
  Json,
  Label,
  Lovelace,
  MintingPolicy,
  Network,
  OutputData,
  PaymentKeyHash,
  PoolId,
  PoolParams,
  Redeemer,
  RewardAddress,
  SlotConfig,
  SpendingValidator,
  StakeKeyHash,
  UnixTime,
  UTxO,
  WithdrawalValidator,
} from '../types/mod.ts'
import {
  assetsToValue,
  createCostModels,
  fromHex,
  networkToId,
  toHex,
  toScriptRef,
  utxoToCore,
} from '../utils/mod.ts'
import { applyDoubleCborEncoding, valueToAssets } from '../utils/utils.ts'
import { Lucid } from './lucid.ts'
import { TxComplete } from './tx_complete.ts'
import * as uplc from 'uplc'
import { SLOT_CONFIG_NETWORK } from '../plutus/time.ts'

type ScriptOrRef =
  | { inlineScript: C.PlutusScript }
  | { referenceScript: C.PlutusV2Script }

export class Tx {
  txBuilder: C.TransactionBuilder

  /* TODO: Add new tasks list so order of attachScript doesn't matter  */
  private scripts: Record<string, ScriptOrRef>
  private native_scripts: Record<string, C.NativeScript>
  /** Stores the tx instructions, which get executed after calling .complete() */
  private tasks: ((that: Tx) => unknown)[]
  private earlyTasks: ((that: Tx) => unknown)[]
  private lucid: Lucid

  private UTxOs: C.TransactionUnspentOutput[] = []
  private referencedUTxOs: C.TransactionUnspentOutput[] = []

  constructor(lucid: Lucid) {
    this.lucid = lucid
    this.txBuilder = C.TransactionBuilder.new(this.lucid.txBuilderConfig)
    this.tasks = []
    this.earlyTasks = []
    this.scripts = {}
    this.native_scripts = {}
  }

  /** Read data from utxos. These utxos are only referenced and not spent. */
  readFrom(utxos: UTxO[]): Tx {
    this.earlyTasks.push(async (that) => {
      for (const utxo of utxos) {
        if (utxo.datumHash) {
          throw 'Reference hash not supported'
          // utxo.datum = Data.to(await that.lucid.datumOf(utxo));
          // // Add datum to witness set, so it can be read from validators
          // const plutusData = C.PlutusData.from_bytes(fromHex(utxo.datum!));
          // that.txBuilder.add_plutus_data(plutusData);
        }
        const coreUtxo = utxoToCore(utxo)
        {
          let scriptRef = coreUtxo.output().script_ref()
          if (scriptRef) {
            let script = scriptRef.script()
            if (!script.as_plutus_v2()) {
              throw "Reference script wasn't V2 compatible"
            }
            this.scripts[script.hash().to_hex()] = {
              referenceScript: script.as_plutus_v2()!,
            }
          }
        }
        this.referencedUTxOs.push(coreUtxo)
        that.txBuilder.add_reference_input(coreUtxo)
      }
    })
    return this
  }

  /**
   * A public key or native script input.
   * With redeemer it's a plutus script input.
   */
  collectFrom(utxos: UTxO[], redeemer?: Redeemer): Tx {
    this.tasks.push(async (that) => {
      for (const utxo of utxos) {
        if (utxo.datumHash && !utxo.datum) {
          utxo.datum = Data.to(await that.lucid.datumOf(utxo))
        }
        const coreUtxo = utxoToCore(utxo)
        this.UTxOs.push(coreUtxo)
        let inputBuilder = C.SingleInputBuilder.new(
          coreUtxo.input(),
          coreUtxo.output(),
        )
        let mr: C.InputBuilderResult
        let address = coreUtxo.output().address()
        let paymentCredential = address.payment_cred()
        if (redeemer && paymentCredential?.to_scripthash()) {
          let paymentCredential = address.payment_cred()
          if (!paymentCredential) {
            throw 'Address has no payment credential'
          }
          if (!paymentCredential.to_scripthash()) {
            throw "Address isn't a scripthash but has a redeemer"
          }
          let scriptHash = paymentCredential.to_scripthash()!.to_hex()
          let script = this.scripts[scriptHash]
          if (!script) {
            throw 'Script was not attached for UTxO spend'
          }
          let datum = coreUtxo.output().datum()?.as_inline_data()
          if ('inlineScript' in script) {
            mr = inputBuilder.plutus_script(
              C.PartialPlutusWitness.new(
                C.PlutusScriptWitness.from_script(script.inlineScript),
                C.PlutusData.from_bytes(fromHex(redeemer)),
              ),
              C.Ed25519KeyHashes.new(),
              datum!,
            )
          } else {
            mr = inputBuilder.plutus_script(
              C.PartialPlutusWitness.new(
                C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
                C.PlutusData.from_bytes(fromHex(redeemer)),
              ),
              C.Ed25519KeyHashes.new(),
              datum!,
            )
          }
        } else {
          let payCred = coreUtxo.output().address().payment_cred()
          if (payCred?.kind() == 0) {
            mr = inputBuilder.payment_key()
          } else {
            let scriptHash = payCred?.to_scripthash()?.to_hex().toString()!
            let ns = this.native_scripts[scriptHash]
            if (!ns) {
              throw 'No native script was found for your mint without redeemer!'
            }
            mr = inputBuilder.native_script(
              ns,
              C.NativeScriptWitnessInfo.assume_signature_count(),
            )
          }
        }
        that.txBuilder.add_input(mr)
      }
    })
    return this
  }

  /**
   * All assets should be of the same policy id.
   * You can chain mintAssets functions together if you need to mint assets with different policy ids.
   * If the plutus script doesn't need a redeemer, you still need to specifiy the void redeemer.
   */
  mintAssets(assets: Assets, redeemer?: Redeemer): Tx {
    this.tasks.push((that) => {
      const units = Object.keys(assets)
      const policyId = units[0].slice(0, 56)
      const mintAssets = C.MintAssets.new()
      units.forEach((unit) => {
        if (unit.slice(0, 56) !== policyId) {
          throw new Error(
            'Only one policy id allowed. You can chain multiple mintAssets functions together if you need to mint assets with different policy ids.',
          )
        }
        mintAssets.insert(
          C.AssetName.new(fromHex(unit.slice(56))),
          C.Int.from_str(assets[unit].toString()),
        )
      })
      let mintBuilder = C.SingleMintBuilder.new(mintAssets)
      let mr: C.MintBuilderResult
      if (redeemer) {
        let script = this.scripts[policyId]
        if (!script) {
          throw 'Scripts must be attached BEFORE they are used'
        }
        if ('inlineScript' in script) {
          mr = mintBuilder.plutus_script(
            C.PartialPlutusWitness.new(
              C.PlutusScriptWitness.from_script(script.inlineScript),
              C.PlutusData.from_bytes(fromHex(redeemer)),
            ),
            C.Ed25519KeyHashes.new(),
          )
        } else {
          mr = mintBuilder.plutus_script(
            C.PartialPlutusWitness.new(
              C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
              C.PlutusData.from_bytes(fromHex(redeemer)),
            ),
            C.Ed25519KeyHashes.new(),
          )
        }
      } else {
        let ns = this.native_scripts[policyId]
        if (!ns) {
          throw 'No native script was found for your mint without redeemer!'
        }
        mr = mintBuilder.native_script(
          ns,
          C.NativeScriptWitnessInfo.assume_signature_count(),
        )
      }
      that.txBuilder.add_mint(mr!)
    })
    return this
  }

  /** Pay to a public key or native script address. */
  payToAddress(address: Address, assets: Assets): Tx {
    this.tasks.push((that) => {
      const output = C.TransactionOutput.new(
        addressFromWithNetworkCheck(address, that.lucid),
        assetsToValue(assets),
      )
      that.txBuilder.add_output(C.SingleOutputBuilderResult.new(output))
    })
    return this
  }

  /** Pay to a public key or native script address with datum or scriptRef. */
  payToAddressWithData(
    address: Address,
    outputData: Datum | OutputData,
    assets: Assets,
  ): Tx {
    this.tasks.push((that) => {
      if (typeof outputData === 'string') {
        outputData = { asHash: outputData }
      }

      if (
        [outputData.hash, outputData.asHash, outputData.inline].filter((b) => b)
          .length > 1
      ) {
        throw new Error(
          'Not allowed to set hash, asHash and inline at the same time.',
        )
      }
      let outputBuilder = C.TransactionOutputBuilder.new()

      // const output = C.TransactionOutput.new(
      //   addressFromWithNetworkCheck(address, that.lucid),
      //   assetsToValue(assets),
      // )
      let outputAddress = addressFromWithNetworkCheck(address, that.lucid)
      outputBuilder = outputBuilder.with_address(outputAddress)

      if (outputData.hash) {
        // output.set_datum(
        //   C.Datum.new_data_hash(C.DataHash.from_hex(outputData.hash)),
        // )
      } else if (outputData.asHash) {
        throw 'no support for as hash'
        // const plutusData = C.PlutusData.from_bytes(fromHex(outputData.asHash));
        // output.set_datum(C.Datum.new_data_hash(C.hash_plutus_data(plutusData)));
        // that.txBuilder.add_plutus_data(plutusData);
      } else if (outputData.inline) {
        const plutusData = C.PlutusData.from_bytes(fromHex(outputData.inline))
        outputBuilder = outputBuilder.with_data(C.Datum.new_data(plutusData))
        //output.set_datum(C.Datum.new_data(plutusData))
      }

      const script = outputData.scriptRef
      if (script) {
        outputBuilder = outputBuilder.with_reference_script(toScriptRef(script))
      }
      let valueBuilder = outputBuilder.next()
      // todo: min coin
      let assetsC = assetsToValue(assets)
      if (BigInt(assetsC.coin().to_str()) < 90000000n) {
        assetsC.set_coin(C.BigNum.from_str('90000000'))
      }
      valueBuilder = valueBuilder.with_value(assetsC)
      let output = valueBuilder.build()
      that.txBuilder.add_output(output)
    })
    return this
  }

  /** Pay to a plutus script address with datum or scriptRef. */
  payToContract(
    address: Address,
    outputData: Datum | OutputData,
    assets: Assets,
  ): Tx {
    if (typeof outputData === 'string') {
      outputData = { asHash: outputData }
    }

    if (!(outputData.hash || outputData.asHash || outputData.inline)) {
      throw new Error(
        'No datum set. Script output becomes unspendable without datum.',
      )
    }
    return this.payToAddressWithData(address, outputData, assets)
  }

  /** Delegate to a stake pool. */
  delegateTo(
    rewardAddress: RewardAddress,
    poolId: PoolId,
    redeemer?: Redeemer,
  ): Tx {
    this.tasks.push((that) => {
      const addressDetails = that.lucid.utils.getAddressDetails(rewardAddress)

      if (addressDetails.type !== 'Reward' || !addressDetails.stakeCredential) {
        throw new Error('Not a reward address provided.')
      }
      const credential =
        addressDetails.stakeCredential.type === 'Key'
          ? C.StakeCredential.from_keyhash(
              C.Ed25519KeyHash.from_bytes(
                fromHex(addressDetails.stakeCredential.hash),
              ),
            )
          : C.StakeCredential.from_scripthash(
              C.ScriptHash.from_bytes(
                fromHex(addressDetails.stakeCredential.hash),
              ),
            )

      let certBuilder = C.SingleCertificateBuilder.new(
        C.Certificate.new_stake_delegation(
          C.StakeDelegation.new(
            credential,
            C.Ed25519KeyHash.from_bech32(poolId),
          ),
        ),
      )
      let cr: C.CertificateBuilderResult
      if (redeemer) {
        let script = this.scripts[credential.to_scripthash()?.to_hex()!]
        if (!script) {
          throw 'Scripts must be attached BEFORE they are used'
        }
        if ('inlineScript' in script) {
          cr = certBuilder.plutus_script(
            C.PartialPlutusWitness.new(
              C.PlutusScriptWitness.from_script(script.inlineScript),
              C.PlutusData.from_bytes(fromHex(redeemer)),
            ),
            C.Ed25519KeyHashes.new(),
          )
        } else {
          cr = certBuilder.plutus_script(
            C.PartialPlutusWitness.new(
              C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
              C.PlutusData.from_bytes(fromHex(redeemer)),
            ),
            C.Ed25519KeyHashes.new(),
          )
        }
      } else {
        if (credential.kind() == 0) {
          cr = certBuilder.payment_key()
        } else {
          let ns = this.native_scripts[credential.to_scripthash()?.to_hex()!]
          if (!ns) {
            throw 'Script with no redeemer should be a nativescript, but none provided'
          } else {
            cr = certBuilder.native_script(
              ns,
              C.NativeScriptWitnessInfo.assume_signature_count(),
            )
          }
        }
      }

      that.txBuilder.add_cert(cr)
    })
    return this
  }

  /** Register a reward address in order to delegate to a pool and receive rewards. */
  registerStake(rewardAddress: RewardAddress): Tx {
    this.tasks.push((that) => {
      const addressDetails = that.lucid.utils.getAddressDetails(rewardAddress)

      if (addressDetails.type !== 'Reward' || !addressDetails.stakeCredential) {
        throw new Error('Not a reward address provided.')
      }
      const credential =
        addressDetails.stakeCredential.type === 'Key'
          ? C.StakeCredential.from_keyhash(
              C.Ed25519KeyHash.from_bytes(
                fromHex(addressDetails.stakeCredential.hash),
              ),
            )
          : C.StakeCredential.from_scripthash(
              C.ScriptHash.from_bytes(
                fromHex(addressDetails.stakeCredential.hash),
              ),
            )

      that.txBuilder.add_cert(
        C.SingleCertificateBuilder.new(
          C.Certificate.new_stake_registration(
            C.StakeRegistration.new(credential),
          ),
        ).skip_witness(),
      )
    })
    return this
  }

  /** Deregister a reward address. */
  deregisterStake(rewardAddress: RewardAddress, redeemer?: Redeemer): Tx {
    this.tasks.push((that) => {
      const addressDetails = that.lucid.utils.getAddressDetails(rewardAddress)

      if (addressDetails.type !== 'Reward' || !addressDetails.stakeCredential) {
        throw new Error('Not a reward address provided.')
      }
      const credential =
        addressDetails.stakeCredential.type === 'Key'
          ? C.StakeCredential.from_keyhash(
              C.Ed25519KeyHash.from_bytes(
                fromHex(addressDetails.stakeCredential.hash),
              ),
            )
          : C.StakeCredential.from_scripthash(
              C.ScriptHash.from_bytes(
                fromHex(addressDetails.stakeCredential.hash),
              ),
            )

      let certBuilder = C.SingleCertificateBuilder.new(
        C.Certificate.new_stake_deregistration(
          C.StakeDeregistration.new(credential),
        ),
      )
      let cr: C.CertificateBuilderResult
      if (redeemer) {
        let script = this.scripts[credential.to_scripthash()?.to_hex()!]
        if (!script) {
          throw 'Scripts must be attached BEFORE they are used'
        }
        if ('inlineScript' in script) {
          cr = certBuilder.plutus_script(
            C.PartialPlutusWitness.new(
              C.PlutusScriptWitness.from_script(script.inlineScript),
              C.PlutusData.from_bytes(fromHex(redeemer)),
            ),
            C.Ed25519KeyHashes.new(),
          )
        } else {
          cr = certBuilder.plutus_script(
            C.PartialPlutusWitness.new(
              C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
              C.PlutusData.from_bytes(fromHex(redeemer)),
            ),
            C.Ed25519KeyHashes.new(),
          )
        }
      } else {
        if (credential.kind() == 0) {
          cr = certBuilder.payment_key()
        } else {
          let ns = this.native_scripts[credential.to_scripthash()?.to_hex()!]
          if (!ns) {
            throw 'Script with no redeemer should be a nativescript, but none provided'
          } else {
            cr = certBuilder.native_script(
              ns,
              C.NativeScriptWitnessInfo.assume_signature_count(),
            )
          }
        }
      }

      that.txBuilder.add_cert(cr)
    })
    return this
  }

  /** Register a stake pool. A pool deposit is required. The metadataUrl needs to be hosted already before making the registration. */
  // registerPool(poolParams: PoolParams): Tx {
  //   this.tasks.push(async (that) => {
  //     const poolRegistration = await createPoolRegistration(
  //       poolParams,
  //       that.lucid,
  //     )

  //     const certificate = C.Certificate.new_pool_registration(poolRegistration)

  //     that.txBuilder.add_cert(certificate)
  //   })
  //   return this
  // }

  // /** Update a stake pool. No pool deposit is required. The metadataUrl needs to be hosted already before making the update. */
  // updatePool(poolParams: PoolParams): Tx {
  //   this.tasks.push(async (that) => {
  //     const poolRegistration = await createPoolRegistration(
  //       poolParams,
  //       that.lucid,
  //     )

  //     // This flag makes sure a pool deposit is not required
  //     //poolRegistration.set_is_update(true)

  //     const certificate = C.Certificate.new_pool_registration(poolRegistration)

  //     that.txBuilder.add_cert(certificate)
  //   })
  //   return this
  // }
  /**
   * Retire a stake pool. The epoch needs to be the greater than the current epoch + 1 and less than current epoch + eMax.
   * The pool deposit will be sent to reward address as reward after full retirement of the pool.
   */
  retirePool(poolId: PoolId, epoch: number): Tx {
    this.tasks.push((that) => {
      const certificate = C.Certificate.new_pool_retirement(
        C.PoolRetirement.new(C.Ed25519KeyHash.from_bech32(poolId), epoch),
      )
      that.txBuilder.add_cert(certificate)
    })
    return this
  }

  withdraw(
    rewardAddress: RewardAddress,
    amount: Lovelace,
    redeemer?: Redeemer,
  ): Tx {
    this.tasks.push((that) => {
      let rewAdd = C.RewardAddress.from_address(
        addressFromWithNetworkCheck(rewardAddress, that.lucid),
      )!
      let certBuilder = C.SingleWithdrawalBuilder.new(
        rewAdd,
        C.BigNum.from_str(amount.toString()),
      )
      let wr: C.WithdrawalBuilderResult
      if (redeemer) {
        let script = this.scripts[
          rewAdd.payment_cred()?.to_scripthash()?.to_hex()!
        ]
        if (!script) {
          throw 'Scripts must be attached BEFORE they are used'
        }
        if ('inlineScript' in script) {
          wr = certBuilder.plutus_script(
            C.PartialPlutusWitness.new(
              C.PlutusScriptWitness.from_script(script.inlineScript),
              C.PlutusData.from_bytes(fromHex(redeemer)),
            ),
            C.Ed25519KeyHashes.new(),
          )
        } else {
          wr = certBuilder.plutus_script(
            C.PartialPlutusWitness.new(
              C.PlutusScriptWitness.from_ref(script.referenceScript.hash()),
              C.PlutusData.from_bytes(fromHex(redeemer)),
            ),
            C.Ed25519KeyHashes.new(),
          )
        }
      } else {
        if (rewAdd.payment_cred().kind() == 0) {
          wr = certBuilder.payment_key()
        } else {
          let ns = this.native_scripts[
            rewAdd.payment_cred()?.to_scripthash()?.to_hex()!
          ]
          if (!ns) {
            throw 'Script with no redeemer should be a nativescript, but none provided'
          } else {
            wr = certBuilder.native_script(
              ns,
              C.NativeScriptWitnessInfo.assume_signature_count(),
            )
          }
        }
      }
      that.txBuilder.add_withdrawal(wr)
    })
    return this
  }

  /**
   * Needs to be a public key address.
   * The PaymentKeyHash is taken when providing a Base, Enterprise or Pointer address.
   * The StakeKeyHash is taken when providing a Reward address.
   */
  addSigner(address: Address | RewardAddress): Tx {
    const addressDetails = this.lucid.utils.getAddressDetails(address)

    if (!addressDetails.paymentCredential && !addressDetails.stakeCredential) {
      throw new Error('Not a valid address.')
    }

    const credential =
      addressDetails.type === 'Reward'
        ? addressDetails.stakeCredential!
        : addressDetails.paymentCredential!

    if (credential.type === 'Script') {
      throw new Error('Only key hashes are allowed as signers.')
    }
    return this.addSignerKey(credential.hash)
  }

  /** Add a payment or stake key hash as a required signer of the transaction. */
  addSignerKey(keyHash: PaymentKeyHash | StakeKeyHash): Tx {
    this.tasks.push((that) => {
      that.txBuilder.add_required_signer(
        C.Ed25519KeyHash.from_bytes(fromHex(keyHash)),
      )
    })
    return this
  }

  validFrom(unixTime: UnixTime): Tx {
    this.tasks.push((that) => {
      const slot = that.lucid.utils.unixTimeToSlot(unixTime)
      that.txBuilder.set_validity_start_interval(
        C.BigNum.from_str(slot.toString()),
      )
    })
    return this
  }

  validTo(unixTime: UnixTime): Tx {
    this.tasks.push((that) => {
      const slot = that.lucid.utils.unixTimeToSlot(unixTime)
      that.txBuilder.set_ttl(C.BigNum.from_str(slot.toString()))
    })
    return this
  }

  attachMetadata(label: Label, metadata: Json): Tx {
    this.tasks.push((that) => {
      let aux = C.AuxiliaryData.new()
      aux.add_metadatum(
        C.BigNum.from_str(label.toString()),
        C.TransactionMetadatum.new_text(JSON.stringify(metadata)),
      )
      that.txBuilder.add_auxiliary_data(aux)
    })
    return this
  }

  /** Converts strings to bytes if prefixed with **'0x'**. */
  attachMetadataWithConversion(label: Label, metadata: Json): Tx {
    this.tasks.push((that) => {
      let aux = C.AuxiliaryData.new()
      aux.add_json_metadatum_with_schema(
        C.BigNum.from_str(label.toString()),
        JSON.stringify(metadata),
        C.MetadataJsonSchema.BasicConversions,
      )
      that.txBuilder.add_auxiliary_data(aux)
    })
    return this
  }

  /* Same as above but MORE detailed! */
  attachMetadataWithDetailedConversion(label: Label, metadata: Json): Tx {
    this.tasks.push((that) => {
      let aux = C.AuxiliaryData.new()
      aux.add_json_metadatum_with_schema(
        C.BigNum.from_str(label.toString()),
        JSON.stringify(metadata),
        C.MetadataJsonSchema.DetailedSchema,
      )
      that.txBuilder.add_auxiliary_data(aux)
    })
    return this
  }

  /** Explicitely set the network id in the transaction body. */
  addNetworkId(id: number): Tx {
    this.tasks.push((that) => {
      that.txBuilder.set_network_id(
        C.NetworkId.from_bytes(fromHex(id.toString(16).padStart(2, '0'))),
      )
    })
    return this
  }

  attachSpendingValidator(spendingValidator: SpendingValidator): Tx {
    this.earlyTasks.push((that) => {
      that.attachScript(spendingValidator)
    })
    return this
  }

  attachMintingPolicy(mintingPolicy: MintingPolicy): Tx {
    this.earlyTasks.push((that) => {
      that.attachScript(mintingPolicy)
    })
    return this
  }

  attachCertificateValidator(certValidator: CertificateValidator): Tx {
    this.earlyTasks.push((that) => {
      that.attachScript(certValidator)
    })
    return this
  }

  attachWithdrawalValidator(withdrawalValidator: WithdrawalValidator): Tx {
    this.earlyTasks.push((that) => {
      that.attachScript(withdrawalValidator)
    })
    return this
  }

  attachScript({
    type,
    script,
  }:
    | SpendingValidator
    | MintingPolicy
    | CertificateValidator
    | WithdrawalValidator) {
    if (type === 'Native') {
      let ns = C.NativeScript.from_bytes(fromHex(script))
      this.native_scripts[ns.hash().to_hex()] = ns
    } else if (type === 'PlutusV1' || type === 'PlutusV2') {
      let ps: C.PlutusScript
      if (type === 'PlutusV1') {
        ps = C.PlutusScript.from_v1(
          C.PlutusV1Script.from_bytes(fromHex(applyDoubleCborEncoding(script))),
        )
      } else {
        ps = C.PlutusScript.from_v2(
          C.PlutusV2Script.from_bytes(fromHex(applyDoubleCborEncoding(script))),
        )
      }
      console.log('Adding script: ', ps.hash().to_hex().toString())
      this.scripts[ps.hash().to_hex().toString()] = { inlineScript: ps }
    } else {
      throw new Error('No variant matched.')
    }
  }

  /** Compose transactions. */
  compose(tx: Tx | null): Tx {
    if (tx) this.tasks = this.tasks.concat(tx.tasks)
    return this
  }

  async complete(options?: {
    change?: { address?: Address; outputData?: OutputData }
    coinSelection?: boolean
    nativeUplc?: boolean
  }): Promise<TxComplete> {
    if (
      [
        options?.change?.outputData?.hash,
        options?.change?.outputData?.asHash,
        options?.change?.outputData?.inline,
      ].filter((b) => b).length > 1
    ) {
      throw new Error(
        'Not allowed to set hash, asHash and inline at the same time.',
      )
    }

    let task = this.earlyTasks.shift()
    while (task) {
      await task(this)
      task = this.earlyTasks.shift()
    }
    task = this.tasks.shift()
    while (task) {
      await task(this)
      task = this.tasks.shift()
    }

    const rawWalletUTxOs = await this.lucid.wallet.getUtxosCore()
    let walletUTxOs: C.TransactionUnspentOutput[] = []
    for (let i = 0; i < rawWalletUTxOs.len(); i++) {
      walletUTxOs.push(rawWalletUTxOs.get(i))
    }
    let allUtxos = [...this.UTxOs, ...walletUTxOs, ...this.referencedUTxOs]

    const changeAddress: C.Address = addressFromWithNetworkCheck(
      options?.change?.address || (await this.lucid.wallet.address()),
      this.lucid,
    )
    for (const utxo of walletUTxOs) {
      this.txBuilder.add_utxo(
        C.SingleInputBuilder.new(utxo.input(), utxo.output()).payment_key(),
      )
    }
    this.txBuilder.select_utxos(2)
    let txRedeemerBuilder = this.txBuilder.build_for_evaluation(
      0,
      changeAddress,
    )
    const protocolParameters = await this.lucid.provider.getProtocolParameters()
    const costMdls = createCostModels(protocolParameters.costModels)
    const slotConfig: SlotConfig = SLOT_CONFIG_NETWORK[this.lucid.network]
    let draftTx = txRedeemerBuilder.draft_tx()
    {
      let redeemers = draftTx.witness_set().redeemers()

      if (redeemers) {
        let newRedeemers = C.Redeemers.new()
        for (let i = 0; i < redeemers!.len(); i++) {
          let redeemer = redeemers.get(i)
          let new_redeemer = C.Redeemer.new(
            redeemer.tag(),
            redeemer.index(),
            redeemer.data(),
            C.ExUnits.new(C.BigNum.zero(), C.BigNum.zero()),
          )
          newRedeemers.add(new_redeemer)
        }
        let new_witnesses = draftTx.witness_set()
        new_witnesses.set_redeemers(newRedeemers)
        // {
        //   let reference_scripts: C.PlutusV2Script[] = Object.values(
        //     this.scripts,
        //   )
        //     .filter((x) => {
        //       if ('referenceScript' in x) {
        //         return true
        //       } else {
        //         return false
        //       }
        //     })
        //     .map(
        //       (x) => 'referenceScript' in x && x.referenceScript,
        //     ) as C.PlutusV2Script[]
        //   let plutusv2scripts = new_witnesses.plutus_v2_scripts() || C.PlutusV2Scripts.new()
        //   for (const x of reference_scripts) {
        //     // let pv2 = C.PlutusV2Script.
        //     console.log("Adding: ", x.hash().to_hex())
        //     plutusv2scripts.add(x)
        //   }
        //   new_witnesses.set_plutus_v2_scripts(plutusv2scripts)
        // }
        draftTx = C.Transaction.new(
          draftTx.body(),
          new_witnesses,
          draftTx.auxiliary_data(),
        )
      }
    }
    let draftTxBytes = draftTx.to_bytes()
    //console.log('About to eval')
    //console.log(Object.keys(this.scripts))
    // Object.values(this.scripts).forEach((x) => {
    //   if ('inlineScript' in x) {
    //     console.log('inline: ', x.inlineScript.hash().to_hex())
    //   } else {
    //     console.log('ref: ', x.referenceScript.hash().to_hex())
    //   }
    // })
    //console.log('pre uplc: ', draftTx.to_json())
    const uplcResults = uplc.eval_phase_two_raw(
      draftTxBytes,
      allUtxos.map((x) => x.input().to_bytes()),
      allUtxos.map((x) => x.output().to_bytes()),
      costMdls.to_bytes(),
      protocolParameters.maxTxExSteps,
      protocolParameters.maxTxExMem,
      BigInt(slotConfig.zeroTime),
      BigInt(slotConfig.zeroSlot),
      slotConfig.slotLength,
    )
    //console.log('Done eval')
    for (const redeemerBytes of uplcResults) {
      let redeemer: C.Redeemer = C.Redeemer.from_bytes(redeemerBytes)
      this.txBuilder.set_exunits(
        C.RedeemerWitnessKey.new(redeemer.tag(), redeemer.index()),
        redeemer.ex_units(),
      )
      //console.log(redeemer.ex_units().to_json())
    }
    let builtTx = this.txBuilder.build(0, changeAddress).build_unchecked()
    return new TxComplete(this.lucid, builtTx)
  }

  /** Return the current transaction body in Hex encoded Cbor. */
  async toString(): Promise<string> {
    let task = this.tasks.shift()
    while (task) {
      await task(this)
      task = this.tasks.shift()
    }

    //return toHex(this.txBuilder);
    return 'INCOMPLETE'
  }
}

// async function createPoolRegistration(
//   poolParams: PoolParams,
//   lucid: Lucid,
// ): Promise<C.PoolRegistration> {
//   const poolOwners = C.Ed25519KeyHashes.new()
//   poolParams.owners.forEach((owner) => {
//     const { stakeCredential } = lucid.utils.getAddressDetails(owner)
//     if (stakeCredential?.type === 'Key') {
//       poolOwners.add(C.Ed25519KeyHash.from_hex(stakeCredential.hash))
//     } else throw new Error('Only key hashes allowed for pool owners.')
//   })

//   const metadata = poolParams.metadataUrl
//     ? await fetch(poolParams.metadataUrl).then((res) => res.arrayBuffer())
//     : null

//   const metadataHash = metadata
//     ? C.PoolMetadataHash.from_bytes(C.hash_blake2b256(new Uint8Array(metadata)))
//     : null

//   const relays = C.Relays.new()
//   poolParams.relays.forEach((relay) => {
//     switch (relay.type) {
//       case 'SingleHostIp': {
//         const ipV4 = relay.ipV4
//           ? C.Ipv4.new(
//               new Uint8Array(relay.ipV4.split('.').map((b) => parseInt(b))),
//             )
//           : undefined
//         const ipV6 = relay.ipV6
//           ? C.Ipv6.new(fromHex(relay.ipV6.replaceAll(':', '')))
//           : undefined
//         relays.add(
//           C.Relay.new_single_host_addr(
//             C.SingleHostAddr.new(relay.port, ipV4, ipV6),
//           ),
//         )
//         break
//       }
//       case 'SingleHostDomainName': {
//         relays.add(
//           C.Relay.new_single_host_name(
//             C.SingleHostName.new(
//               relay.port,
//               C.DNSRecordAorAAAA.new(relay.domainName!),
//             ),
//           ),
//         )
//         break
//       }
//       case 'MultiHost': {
//         relays.add(
//           C.Relay.new_multi_host_name(
//             C.MultiHostName.new(C.DNSRecordSRV.new(relay.domainName!)),
//           ),
//         )
//         break
//       }
//     }
//   })

//   return C.PoolRegistration.new(
//     C.PoolParams.new(
//       C.Ed25519KeyHash.from_bech32(poolParams.poolId),
//       C.VRFKeyHash.from_hex(poolParams.vrfKeyHash),
//       C.BigNum.from_str(poolParams.pledge.toString()),
//       C.BigNum.from_str(poolParams.cost.toString()),
//       C.UnitInterval.new(
//         C.BigNum.from_str(poolParams.margin[0].toString()),
//         C.BigNum.from_str(poolParams.margin[1].toString()),
//       ),
//       C.RewardAddress.from_address(
//         addressFromWithNetworkCheck(poolParams.rewardAddress, lucid),
//       )!,
//       poolOwners,
//       relays,
//       metadataHash
//         ? C.PoolMetadata.new(C.URL.new(poolParams.metadataUrl!), metadataHash)
//         : undefined,
//     ),
//   )
// }

function addressFromWithNetworkCheck(
  address: Address | RewardAddress,
  lucid: Lucid,
): C.Address {
  const { type, networkId } = lucid.utils.getAddressDetails(address)

  const actualNetworkId = networkToId(lucid.network)
  if (networkId !== actualNetworkId) {
    throw new Error(
      `Invalid address: Expected address with network id ${actualNetworkId}, but got ${networkId}`,
    )
  }
  return type === 'Byron'
    ? C.ByronAddress.from_base58(address).to_address()
    : C.Address.from_bech32(address)
}

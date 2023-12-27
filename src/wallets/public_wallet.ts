import {
  C,
  UTxO,
  paymentCredentialOf,
  utxoToCore,
  Delegation,
  TxHash,
  Address,
  RewardAddress,
  Transaction,
  SignedMessage,
  Translucent,
  AddressDetails,
} from '../mod'
import { toCore } from '../utils/to'
import { AbstractWallet } from './abstract'

/**
 * A wallet that can be constructed from external data e.g utxos and an address.
 * It doesn't allow you to sign transactions/messages. This needs to be handled separately.
 */
export class ExternalWallet implements AbstractWallet {
  translucent: Translucent
  walletDetails: {
    address: Address
    utxos?: UTxO[]
    rewardAddress?: RewardAddress
  }
  addressDetails: AddressDetails

  constructor(
    translucent: Translucent,
    address: Address,
    utxos?: UTxO[],
    rewardAddress?: RewardAddress,
  ) {
    this.translucent = translucent
    this.walletDetails = {
      address,
      utxos,
      rewardAddress,
    }
    const addressDetails = this.translucent.utils.getAddressDetails(address)
    this.addressDetails = addressDetails
  }

  async address(): Promise<Address> {
    return this.walletDetails.address
  }
  async rewardAddress(): Promise<RewardAddress | null> {
    const rewardAddr =
      !this.walletDetails.rewardAddress && this.addressDetails.stakeCredential
        ? (() =>
            C.RewardAddress.new(
              this.translucent.network === 'Mainnet' ? 1 : 0,
              toCore.credential(this.addressDetails.stakeCredential),
            )
              .to_address()
              .to_bech32(undefined))()
        : this.walletDetails.rewardAddress
    return rewardAddr || null
  }
  async getUtxos(): Promise<UTxO[]> {
    return this.walletDetails.utxos
      ? this.walletDetails.utxos
      : await this.translucent.utxosAt(
          paymentCredentialOf(this.walletDetails.address),
        )
  }
  async getUtxosCore(): Promise<C.TransactionUnspentOutputs> {
    const coreUtxos = C.TransactionUnspentOutputs.new()
    ;(this.walletDetails.utxos
      ? this.walletDetails.utxos
      : await this.translucent.utxosAt(
          paymentCredentialOf(this.walletDetails.address),
        )
    ).forEach((utxo) => coreUtxos.add(utxoToCore(utxo)))
    return coreUtxos
  }
  async getDelegation(): Promise<Delegation> {
    const rewardAddr = await this.rewardAddress()

    return rewardAddr
      ? await this.translucent.delegationAt(rewardAddr)
      : { poolId: null, rewards: 0n }
  }
  async signTx(): Promise<C.TransactionWitnessSet> {
    throw new Error('Not implemented')
  }
  async signMessage(): Promise<SignedMessage> {
    throw new Error('Not implemented')
  }
  async submitTx(tx: Transaction): Promise<TxHash> {
    return await this.translucent.provider.submitTx(tx)
  }
}

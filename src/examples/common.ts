import { Translucent } from "../translucent/mod";
import { Network, Provider } from "../types/mod";

/**
 * Get a Translucent instance with a wallet.
 * It assumes you are in a server environment
 * It will check if there is a seed.txt file with the phrase
 * Otherwise it will generate a new one and save it to seed.txt
 * Will instance translucent selecting a wallet from the seed phrase
 **/
export async function getInstanceWithWallet(
  provider: Provider,
  network?: Network,
): Promise<Translucent> {
  const translucent = await Translucent.new(provider, network);
  const seedFile = Bun.file("seed.txt");
  const exists = await seedFile.exists();
  const seed = exists
    ? await seedFile.text()
    : translucent.utils.generateSeedPhrase();
  Bun.write("./seed.txt", seed);

  translucent.selectWalletFromSeed(seed);

  // get the address to fund it
  console.log("Address to fund: ", await translucent.wallet.address());
  return translucent;
}

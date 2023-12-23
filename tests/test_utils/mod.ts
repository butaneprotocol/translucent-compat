import { Kupmios, Translucent } from "../../src/mod.ts";
import { Maestro } from "../../src/provider/maestro.ts";
import CONFIG from "./config.ts";

export async function setupTestInstance({
  accountIndex = 0,
}: {
  accountIndex: number;
}) {
  if (!CONFIG.KUPO_URL || !CONFIG.OGMIOS_URL) {
    throw new Error("Missing KUPO_URL or OGMIOS_URL environment variable");
  }
  // const provider = new Kupmios(CONFIG.KUPO_URL, CONFIG.OGMIOS_URL);
  // Using maestro until we rollback Kupmios
  const provider = new Maestro({
    network: "Preview",
    apiKey: "<API_KEY>",
  });
  const translucent = await Translucent.new(provider, "Preview");
  if (!CONFIG.SEED_PHRASE) {
    throw new Error("Missing SEED_PHRASE environment variable");
  }
  translucent.selectWalletFromSeed(CONFIG.SEED_PHRASE, { accountIndex });
  const address = await translucent.wallet.address();
  const details = translucent.utils.getAddressDetails(address);
  return { translucent, address, details };
}

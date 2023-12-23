import { Translucent, KupmiosV5, Kupmios } from "../../src/mod.ts";
import {} from "../../src/provider/kupmiosv5.ts";
import CONFIG from "./config.ts";

export async function setupTestInstance({
  accountIndex = 0,
}: {
  accountIndex: number;
}) {
  if (!CONFIG.KUPO_PREVIEW_URL || !CONFIG.OGMIOS_PREVIEW_URL) {
    throw new Error("Missing KUPO_URL or OGMIOS_URL environment variable");
  }
  const provider = CONFIG.USE_OGMIOS_V5
    ? new KupmiosV5(CONFIG.KUPO_PREVIEW_URL, CONFIG.OGMIOS_PREVIEW_URL)
    : new Kupmios(CONFIG.KUPO_PREVIEW_URL, CONFIG.OGMIOS_PREVIEW_URL);
  // Using maestro until we rollback Kupmios
  // const provider = new Maestro({
  //   network: "Preview",
  //   apiKey: "<API_KEY>",
  // });
  const translucent = await Translucent.new(provider, "Preview");
  if (!CONFIG.SEED_PHRASE) {
    throw new Error("Missing SEED_PHRASE environment variable");
  }
  translucent.selectWalletFromSeed(CONFIG.SEED_PHRASE, { accountIndex });
  const address = await translucent.wallet.address();
  const details = translucent.utils.getAddressDetails(address);
  return { translucent, address, details };
}

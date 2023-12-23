const CONFIG = {
  KUPO_PREVIEW_URL: process.env.KUPO_PREVIEW_URL ?? "",
  KUPO_PREVIEW_APIKEY: process.env.KUPO_PREVIEW_APIKEY ?? "",

  OGMIOS_PREVIEW_URL: process.env.OGMIOS_PREVIEW_URL ?? "",
  OGMIOS_PREVIEW_APIKEY: process.env.OGMIOS_PREVIEW_APIKEY ?? "",
  USE_OGMIOS_V5: process.env.USE_OGMIOS_V5 === "1",

  MAESTRO_API_KEY: process.env.MAESTRO_API_KEY ?? "",

  SEED_PHRASE: process.env.SEED_PHRASE ?? "",
};
export default CONFIG;

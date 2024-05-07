<p align="center">
  <img width="100px" src="./logo/translucent.svg" align="center"/>
  <h1 align="center">Translucent-compat</h1>
  <p align="center">Translucent was a fork of the Lucid library. It is **deprecated** in favour of <a href="https://github.com/butaneprotocol/blaze-cardano" target="_blank">blaze</a> </p>
</p>

### Get started

#### Bun

Development happens in bun. We use bun build:wasm, bun test. If you want to contribute to translucent, please do so with bun.
Translucent can be used from any other js runtime.

#### NPM

```
npm install translucent-cardano
```

#### Vite packaging

Use polyfills to make translucent run in the browser.

(these polyfills are preliminary and we should package translucent for the browser)

```
resolve: {
		alias: {
			'node-fetch': 'node-fetch-polyfill',
			'sha256': 'tiny-sha256',
			'@sinclair/typebox': '@sinclair/typebox',
			'@dcspark/cardano-multiplatform-lib-nodejs': '@dcspark/cardano-multiplatform-lib-browser',
			'uplc-node': 'translucent/uplc/pkg-web',
			'@emurgo/cardano-message-signing-nodejs': '@emurgo/cardano-message-signing-browser',
		}
	},
optimizeDeps: {
		exclude: ['translucent', 'typebox'],
    ...
	},
```

#### Deno

```
... how to use translucent in deno ...
```

### Basic usage

```js
import { Maestro, Translucent } from "translucent-cardano";

const translucent = await Translucent.new(
  new Maestro({
    network: "Mainnet",
    apiKey: "<apikey>",
    turboSubmit: true,
  }),
  "Mainnet",
);

// Assumes you are in a browser environment
const api = await window.cardano.nami.enable();
translucent.selectWallet(api);

const tx = await translucent
  .newTx()
  .payToAddress("addr...", { lovelace: 5000000n })
  .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();

console.log(txHash);
```

<!--
### Test

```
bun test
```

This library uses the canonical version of serialization-lib.
We import uplc via a wrapper for the aiken package.

### Build Wasm

The wrappers for uplc are a crate in this repository in the uplc folder.
The command build:wasm uses wasm-pack to build them.

```
deno task build:wasm
```

### Docs

Documentation is a work-in-progress
``` -->

Join us on [Discord](https://discord.gg/FAeAR6jX)!

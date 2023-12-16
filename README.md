<p align="center">
  <img width="100px" src="./logo/translucent.svg" align="center"/>
  <h1 align="center">Translucent</h1>
  <p align="center">Translucent is a library, which allows you to create Cardano transactions and off-chain code for your Plutus contracts in JavaScript.<br/>
  Translucent forks from Lucid and makes major breaking changes.</p>

<p align="center">
    <img src="https://img.shields.io/github/commit-activity/m/butaneprotocol/translucent?style=for-the-badge" />
    <a href="https://www.npmjs.com/package/translucent-cardano">
      <img src="https://img.shields.io/npm/v/translucent-cardano?style=for-the-badge" />
    </a>
    <a href="https://www.npmjs.com/package/translucent-cardano">
      <img src="https://img.shields.io/npm/dw/translucent-cardano?style=for-the-badge" />
    </a>
    <img src="https://img.shields.io/npm/l/translucent-cardano?style=for-the-badge" />
    <a href="https://twitter.com/butaneprotocol">
      <img src="https://img.shields.io/twitter/follow/butaneprotocol?style=for-the-badge&logo=twitter" />
    </a>
  </p>

</p>

### Get started

#### NPM

```
npm install translucent-cardano
```
<!-- 
#### Deno 🦕

For JavaScript and TypeScript

```js
import { Translucent } from "https://deno.land/x/translucent@0.10.7/mod.ts";
```

#### Web

```html
<script type="module">
import { Translucent } from "https://unpkg.com/translucent-cardano@0.10.7/web/mod.js"
// ...
</script>
```

###  -->

### Examples

- [Basic examples](./src/examples/)
- [Next.js Blockfrost Proxy API Example](https://github.com/GGAlanSmithee/cardano-translucent-blockfrost-proxy-example)

### Basic usage

```js
import { Blockfrost, Translucent } from "translucent-cardano";

const translucent = await Translucent.new(
  new Blockfrost("https://cardano-preview.blockfrost.io/api/v0", "<projectId>"),
  "Preview",
);

// Assumes you are in a browser environment
const api = await window.cardano.nami.enable();
translucent.selectWallet(api);

const tx = await translucent.newTx()
  .payToAddress("addr...", { lovelace: 5000000n })
  .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();

console.log(txHash);
```
<!-- 
### Test

```
deno task test
```

### Build Core

This library is built on top of a customized version of the serialization-lib
(cardano-multiplatform-lib) and on top of the message-signing library, which are
written in Rust.

```
deno task build:core
```

### Test Core

```
deno task test:core
```

### Docs

[View docs](https://doc.deno.land/https://deno.land/x/translucent/mod.ts) 📖

You can generate documentation with:

```
deno doc
``` -->

### Compatibility

Translucent is an ES Module, so to run it in the browser any bundler which allows for
top level await and WebAssembly is recommended. If you use Webpack 5 enable in
the `webpack.config.js`:

```
experiments: {
    asyncWebAssembly: true,
    topLevelAwait: true,
    layers: true // optional, with some bundlers/frameworks it doesn't work without
  }
```

To run the library in Node.js you need to set `{"type" : "module"}` in your
project's `package.json`. Otherwise you will get import issues.

### Contributing

Contributions and PRs are welcome!\
The [contribution instructions](./CONTRIBUTING.md).

Join us on [Discord](https://discord.gg/butane)!

<!-- ### Use Translucent with React

[use-cardano](https://use-cardano.alangaming.com/) a React context, hook and set
of components built on top of Translucent.

### Use Translucent with Next.js

[Cardano Starter Kit](https://cardano-starter-kit.alangaming.com/) a Next.js
starter kit for building Cardano dApps. -->

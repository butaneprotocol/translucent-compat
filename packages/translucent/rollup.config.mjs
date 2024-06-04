import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import json from "@rollup/plugin-json";

const name = "index"

const bundle = (config) => ({
  ...config,
  input: "index.ts",
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [esbuild(), json()],
    output: [
      {
        file: `build/${name}.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `build/${name}.es.js`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `build/${name}.d.ts`,
      format: "es",
    },
  }),
];

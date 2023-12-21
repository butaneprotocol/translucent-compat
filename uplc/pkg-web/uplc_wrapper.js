import * as wasm from "./uplc_wrapper_bg.wasm";
import { __wbg_set_wasm } from "./uplc_wrapper_bg.js";
__wbg_set_wasm(wasm);
export * from "./uplc_wrapper_bg.js";

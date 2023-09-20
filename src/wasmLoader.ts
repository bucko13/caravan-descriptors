import type * as web from "src/caravan-rs/pkg-web/caravan_rs";
import type * as node from "src/caravan-rs/pkg-nodejs/caravan_rs";

let bdkWasm: Promise<typeof web | typeof node>;

if (typeof window !== "undefined") {
  // Browser environment
  bdkWasm = import("./caravan-rs/pkg-web/caravan_rs");
} else {
  // Node.js environment
  bdkWasm = import("./caravan-rs/pkg-nodejs/caravan_rs");
}

export default bdkWasm;

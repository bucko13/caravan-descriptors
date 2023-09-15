# caravan-config

This is a proof of concept for now for using bdk to convert between descriptors
and a caravan compatible wallet configuration.

# Installation

1. clone
2. install [rust toolchain](https://www.rust-lang.org/tools/install) and `cargo install wasm-pack`
3. npm install in the main directory
4. cd to the caravan-rs directory and `wasm-pack build` to build the `pkg/` directory
   1. You might need to install llvm/clang

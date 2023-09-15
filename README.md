# caravan-config

This is a proof of concept for now for using bdk to convert between descriptors
and a caravan compatible wallet configuration.

# Installation

1. clone
2. install [rust toolchain](https://www.rust-lang.org/tools/install) and `cargo install wasm-pack`
3. npm install in the main directory
4. cd to the caravan-rs directory and `wasm-pack build -t nodejs` to build the `pkg/` directory (not clear yet if nodejs is the right target or how to make it more flexible)
   1. You might need to install llvm/clang
   2. Will also need to setup paths to build libsecp
  ```
export PATH="/opt/homebrew/opt/llvm/bin:$PATH"
# for older homebrew installs
# export PATH="/usr/local/opt/llvm/bin:$PATH"
export CC=/opt/homebrew/opt/llvm/bin/clang
export AR=/opt/homebrew/opt/llvm/bin/llvm-ar
  ```

rm -rf pkg
rm -rf pkg-node
rm -rf pkg-web
wasm-pack build -t nodejs
mv pkg pkg-node
wasm-pack build -t web
mv pkg pkg-web
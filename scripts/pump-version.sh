#!/usr/bin/env bash

set -euo pipefail

version=$1

cd packages/translucent

echo "update version field"
sed -i -E 's/"version": ".+minswap.+"/"version": "'"$version"'"/' package.json

echo "publish"
pnpm run build
pnpm publish --no-git-checks

echo "commit new version"
git add package.json
git commit -m "publish version $version"

echo "tag version"
git tag "$version"

echo "push to remote"
git push origin minswap
git push origin "$version"

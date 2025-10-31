#!/bin/env bash
echo "构建已开始，这可能需要话费一段时间)"
browserify stdlib.js -o stdlib.b.js
uglifyjs stdlib.b.js -c -m -o dist/stdlib.min.js
rm stdlib.b.js
echo "构建完成，输出在 dist/stdlib.min.js"
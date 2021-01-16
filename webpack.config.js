const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const babel = require('@babel/core')
// const less = require('less')

module.exports = {
  mode: 'development',
  watch: true,
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*.js",
          // filter: "'*.test.js",
          to: "./",
          context: "./src",
          transform(content, path) {
            const newCode = babel.transformSync(content, {
              babelrc:true,
              "presets": ["@babel/env"]
            }).code;
            return Promise.resolve(newCode.toString())
          }
        },
      ],
    }),
  ],
}
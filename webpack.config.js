const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const babel = require('@babel/core')
const less = require('less')

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
          from: '**/*.wxml',
          to: './',
          context: './src'
        },
        {
          from: '**/*.json',
          to: './',
          context: './src'
        },
        {
          from: '**/*.jpg',
          to: './',
          context: './src',
          noErrorOnMissing:true
        },
        {
          from: '**/*.png',
          to: './',
          context: './src',
          noErrorOnMissing:true
        },
        {
          from: '**/*.css',
          to: './',
          context: './src',
          noErrorOnMissing:true
        },
        // {
        //   from: '**/*.less',
        //   to: './',
        //   transform(content, path) {
        //     return less.render(content.toString())
        //       .then(function (output) {
        //         return output.css;
        //       });
        //   },
        //   transformPath(targetPath) {
        //     return targetPath.replace('.less', '.wxss')
        //   }
        // },
        {
          from: "**/*.js",
          to: "./",
          context: "./src",
          globOptions: {
            ignore: ["'*.test.js"]
          },
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
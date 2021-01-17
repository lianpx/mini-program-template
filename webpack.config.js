const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const babel = require('@babel/core')
const less = require('less')

const webpackConfig = {

};

module.exports = {
  mode: 'development',
  watch: true,
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
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
        //   from: '**/*.wxss',
        //   to: './',
        //   context: './src',
        //   noErrorOnMissing:true
        // },
        {
          from: '**/*.less',
          to: "[path][name].wxss",
          context: './src',
          force: true,
          transform(content, path) {
            return less.render(content.toString())
              .then(function (output) {
                return output.css;
              });
          },
        },
        {
          from: "**/*.js",
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
    },{options: [{context: './src'}]}),
  ],
}
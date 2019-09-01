const path = require("path");

/**
 * .babelrc
 * 1. 需要安装: @babel/plugin-transform-runtime, @babel/runtime , 提供工具类函数
 * 2. @babel/plugin-transform-runtime 配置
 *    1. 不配置, plugin, 打包结果: 4.37kb
 *    2. 配置 ["@babel/plugin-transform-runtime", {"corejs": false}], 打包结果: 5.14kb
 *    3. 配置 ["@babel/plugin-transform-runtime", {"corejs": 2}], 需要安装依赖 @babel/runtime-corejs2
 *    4. 配置 ["@babel/plugin-transform-runtime", {"corejs": 3}], 需要安装依赖 @babel/runtime-corejs3
 */

module.exports = {
  entry: "./app.js",
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [],
  mode: 'development'
};

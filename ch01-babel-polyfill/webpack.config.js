const path = require("path");

/**
 * .babelrc
 * 1. @babel/preset-env 配置, 不需要依赖 @babel/polyfill, 只需要 devDependencies 安装 core-js@2.X
 *    1. "useBuiltIns": false,   打包结果: 3.86kb, 对箭头函数进行转换, 没有添加垫片
 *    2. "useBuiltIns": "usage", "corejs": 2, 打包结果: 27.7kb, 对箭头函数进行转换, 并且添加了用到的垫片
 *    3. "useBuiltIns": "usage", "corejs": 3, 打包结果: 53.9kb, 对箭头函数进行转换, 并且添加了用到的垫片
 *    4. "useBuiltIns": "entry",  入口文件添加 import '@babel/polyfill', 打包结果: 451kb, 添加了所有的垫片
 *
 * 2. @babel/preset-env "usage" + 安装 @babel/polyfill, , 27.7kb
 * 3. @babel/preset-env "usage" + 安装 core-js, 27.7kb
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

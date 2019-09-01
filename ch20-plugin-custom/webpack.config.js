const path = require('path');

const CustomPlugin = require('./src/plugins/CustomPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins:[
    new CustomPlugin({
      name: "123"
    }),
  ],
};

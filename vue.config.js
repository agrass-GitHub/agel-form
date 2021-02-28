const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const production = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: production ? './' : '/',
  productionSourceMap: production ? false : true,
  css: {
    extract: false
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
};

// npm config set registry http://registry.npm.taobao.org/
// npm config set registry https://registry.npmjs.org/
const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@app': resolve('./src'),
        '@style': resolve('./src/style'),
        '@components': resolve('./src/components'),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        `,
      },
    },
  },
};

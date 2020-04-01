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
        @import "~bootstrap/scss/_functions.scss";
        @import "@/style/common/_bs-variables.scss";
        @import "@/style/common/_variables.scss";
        @import "~bootstrap/scss/_variables.scss";
        @import "~bootstrap/scss/_mixins.scss";
        @import "@/style/common/_mixins.scss";
        `,
      },
    },
  },
};

const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: "dist",
  // assetsDir:'static',
  // productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
        assets: path.resolve(__dirname, "src/assets"),
        components: path.resolve(__dirname, "src/components"),
        api: path.resolve(__dirname, "src/api"),
        utils: path.resolve(__dirname, "src/utils"),
        store: path.resolve(__dirname, "src/store"),
        router: path.resolve(__dirname, "src/router")
      },
      extensions: [".vue", ".js", ".json"]
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/variables.scss";`
      }
    }
  }
};

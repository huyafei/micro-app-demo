const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8083,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});

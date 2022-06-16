const path = require("path")

module.exports = {
  outputDir: "./dist",
  publicPath: "./",
  configureWebpack: (config) => {
    config.resolve.alias = {
      "@": path.resolve(__dirname, "src"),
      components: "@/components"
    }
  }
}

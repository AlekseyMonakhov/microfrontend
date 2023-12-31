const { merge } = require("webpack-merge");
const ModuleFederation = require("webpack/lib/container/ModuleFederationPlugin");

const packageJSON = require("../package.json")
const commonConfig = require("./webpack.common")

const prodConfig = {
    mode: "production",
    output: {
        filename: `[name].[contenthash].js`
    },
    plugins: [
        new ModuleFederation({
            name: 'marketing',
            filename: 'remoteEntry.js',
            publicPath: '/marketing/latest/',
            exposes: {
                './MarketingApp': './src/bootstrap',
            },
            shared: packageJSON.dependencies
        })
    ],
}

module.exports = merge(commonConfig, prodConfig);
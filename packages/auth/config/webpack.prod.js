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
            name: 'auth',
            filename: 'remoteEntry.js',
            publicPath: '/auth/latest/',
            exposes: {
                './AuthApp': './src/bootstrap',
            },
            shared: packageJSON.dependencies
        })
    ],
}

module.exports = merge(commonConfig, prodConfig);
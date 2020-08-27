const path = require("path");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/js/index.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },

    devtool: "eval",
    devServer: {
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {"targets": { "node": "current", "ie": "11" }}]],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader?url=true"
                        },
                        {
                            loader: "postcss-loader",
                            options:{
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist: ['last 4 version']
                                    })
                                ]
                            }
                        },
                    ]
            })},
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000' }
        ],
    },
    plugins: [
        new ExtractTextPlugin({filename: 'style.css'})
    ]
};
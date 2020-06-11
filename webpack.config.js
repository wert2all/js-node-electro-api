const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const production = (process.env.NODE_ENV === 'production');

module.exports = {
    mode: (production) ? 'production' : 'development',
    entry: {
        js: './assets/js.js',
        css: './assets/css.js'
    },
    devtool: production ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ],
    },
    optimization: {
        minimizer: production ? [new TerserPlugin()] : []
    }
};

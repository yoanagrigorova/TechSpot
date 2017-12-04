var path = require('path');
var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // context: path.resolve(__dirname, '/'),
    entry: './public/javascripts/router.js',
    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: 'node_modules'
            },
            {
                test: /\.htm|.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },

            {
                test: /\.css$/,
                include: path.resolve(__dirname, './public/stylesheets/'),
                loader: ['style-loader', 'css-loader']
            },

            {
                test: /\.(png|jpg|gif|woff|woff2|eot|svg)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },

            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 8192
            //             }
            //         }
            //     ]
            // }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new UglifyJsPlugin()
    ]
}
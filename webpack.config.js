const path = require("path");
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: [
        __dirname + '/client/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'client/build'),
        filename: 'bundle.js',
        publicPath: '/build',
    },
    resolve: {
        alias: {
            client: path.resolve(__dirname, 'client/')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'env']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: './client/css/variables.scss',
                        },
                    },
                ],
            },
            {
                test: /\.svg/,
                loader: 'svg-url-loader',
            },
            {
                test: /\.(ttf|eot|woff|woff2|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                }
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env',
            safe: false,
            systemvars: true,
            silent: false
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};
const path = require("path");

module.exports = {
    entry: [
        __dirname + '/client/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'client/build'),
        filename: 'bundle.js',
        publicPath: '/build',
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
                loader: 'style-loader!css-loader!sass-loader'
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
    devServer: {
        historyApiFallback: true
    }
};
console.log(__dirname);
const path = require("path");

module.exports = {
    entry: [__dirname + '/client/index.js'],
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
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};
console.log(__dirname);
module.exports = {
    devtool: 'inline-source-map',
    entry: [__dirname + '/client/index.js'],
    output: {
        path: __dirname + '/client/build',
        filename: 'bundle.js',
        publicPath: '/'
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
    }
};
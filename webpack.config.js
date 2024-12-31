const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.json', '.js']
    },
    module: {
        rules: [{
            test: /\.ts/,
            use: 'ts-loader',
            exclude: /node_modules/
        }],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            fileName: 'index.html'
        }),
    ],
}
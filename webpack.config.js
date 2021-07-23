const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  const filename = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
    ]

    if (isDev) {
      base.push(new ESLintPlugin())
    }

    return base
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill', './index.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
      clean: true,
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: '3000',
      hot: true,
      open: true,
    },
    target: 'web',
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
  }
}

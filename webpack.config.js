const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
  const { DEV, MSW } = env;

  if (MSW) {
    dotenv.config({ path: './.env.msw' });
  } else if (DEV) {
    dotenv.config({ path: './.env.local' });
  } else {
    dotenv.config({ path: './.env.production' });
  }

  const publicPath = process.env.CDN_URL || '/';

  return {
    name: 'PICK-O',
    mode: DEV ? 'development' : 'production',
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                { runtime: 'automatic', importSource: '@emotion/react' },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [
              '@emotion/babel-plugin', // 추가
            ],
          },
        },
        {
          test: /\.(css|scss)$/i,
          use: ['style-loader', 'css-loader'],
          include: [path.resolve(__dirname, 'src/styles')],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: {
            loader: '@svgr/webpack',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.EnvironmentPlugin(['API_URL']),
      new webpack.DefinePlugin({
        'process.env.MSW': env.MSW,
      }),
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath,
      clean: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
    devServer: {
      host: 'localhost',
      port: 4000,
      open: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: process.env.API_URL,
          pathRewrite: { '^/api': '' },
        },
      },
    },
  };
};

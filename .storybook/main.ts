import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { Configuration } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ['../src/assets'],
  webpackFinal: async (config: Configuration) => {
    config.module!.rules = [
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
          plugins: ['@emotion/babel-plugin'],
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader'],
        include: [path.resolve(__dirname, '../src/styles')],
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
    ];

    config.resolve!.extensions!.push('.js', '.jsx', '.ts', '.tsx');
    config.resolve!.alias = {
      '@': path.resolve(__dirname, '../src/'),
    };

    return config;
  },
};

export default config;

// webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: 'A budget management app',
      },
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', href: '/assets/favicon.png', sizes: '192x192' },
        { rel: 'icon', href: '/assets/favicon.png', sizes: '512x512' }
      ]
    })
  );

  return config;
};

import webpack from 'webpack';
import path from 'path';

// const NODE_ENV = process.env.NODE_ENV;
// const dotenv = require('dotenv');

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
  }
};

// ENV variables
// const dotEnvVars = dotenv.config();
// const environmentEnv = dotenv.config({
//   path: join(root, 'config', `${NODE_ENV}.config.js`),
//   silent: true,
// });
// const envVariables =
//   Object.assign({}, dotEnvVars, environmentEnv);
//
// const defines =
//   Object.keys(envVariables)
//     .reduce((memo, key) => {
//       const val = JSON.stringify(envVariables[key]);
//       memo[`__${key.toUpperCase()}__`] = val;
//       return memo;
//     }, {
//       __NODE_ENV__: JSON.stringify(NODE_ENV)
//     });
//
// config.plugins = [
//   new webpack.DefinePlugin(defines)
// ].concat(config.plugins);
// END ENV variables


    // Work around for https://github.com/angular/angular-cli/issues/7200
    
    const path = require('path');
    const webpack = require('webpack');
    const routes = require('static.paths');

    const APP_NAME = "ae-therapy";

    module.exports = {
      entry: {
        server: './server.ts',
      },
      target: 'node',
      resolve: { extensions: ['.ts', '.js'] },
      externals: [/^firebase/],
        // [/(node_modules|main\..*\.js)/,],
        output: {
          // Export a UMD of the webpacked server.ts & deps, for
          // rendering in Cloud Functions
          path: path.join(__dirname, `dist/${APP_NAME}-webpack`),
          library: 'app',
          libraryTarget: 'umd',
          filename: '[name].js'
        },
        module: {
          rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
          ]
        },
        plugins: [
          new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            routes // a map of your routes
          ),
          new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'),
            routes
          )
      ]
    }
    
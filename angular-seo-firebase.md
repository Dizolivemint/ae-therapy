Step 1 - Generate an Angular 6 App
ng new ssrApp --routing
If using Firebase, make sure to follow the official step guide for AngularFire2. Make sure you’re on the latest version.

Step 2 - Generate Universal Code and Update NgModules
We can now generate much of the Universal boilerplate with the Angular CLI. In 2018, a render engine was introduced for express to simplfy the server code.

ng generate universal --client-project YOUR_PROJECT_NAME

# New Render Engine
npm install @nguniversal/express-engine

# If using lazy loading
npm install @nguniversal/module-map-ngfactory-loader
If transferring state between server/browser, update your NgModules accordingly. The browser app should have the following imports in src/app/app.module:

import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'YOUR_PROJECT_NAME' }), // <-- here
    BrowserTransferStateModule
  ]
})
Update the src/app/app.server.module with the following code:

import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

@NgModule({
  imports: [
    ServerTransferStateModule, //  <-- needed for state transfer
    ModuleMapLoaderModule // <-- needed for lazy-loaded routes
  ]
})
export class AppServerModule {}
Step 3 - Create an ExpressJS Server
The ExpressJS app will be deployed to a NodeJS server and render the app on the server at runtime. A few extra dependencies are required if you plan on using Firebase server-side.

npm install --save-dev express webpack ts-loader

# If using Firebase
npm install --save-dev ws xmlhttprequest
Create server.ts in the project root.

// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// DOM libs required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { join } from 'path';

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'base6';

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

const app = express();

// Set the engine
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');

app.get('/**/*', (req, res) => {
  res.render(join(DIST_FOLDER, APP_NAME, 'index'), {
    req,
    res
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, APP_NAME));

// Static Assets
app.get('*.*', express.static(join(DIST_FOLDER, APP_NAME)));

// Point all routes to Universal
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
Step 4 - Create a Webpack Config to Compile the Server
Create webpack.server.config.js in the project root.

const path = require('path');
const webpack = require('webpack');

const APP_NAME = 'base6';

module.exports = {
  entry: { server: './server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  mode: 'none',
  target: 'node',
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.join(__dirname, `dist/${APP_NAME}`),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
Step 5 - Build Scripts
Here are the commands to build and run your Universal app.

Build Angular browser app ng build --prod
Build Angular server app ng run YOUR_PROJECT_NAME:server
Build Express server webpack --config webpack.server.config.js
Serve the app node dist/server.js
You might combine these commands in your package.json scripts to simplify the build process.

"scripts": {
  // ... omitted
  "build:ssr": "ng build --prod && ng run YOUR_PROJECT_NAME:server && npm run webpack:server",
  "serve:ssr": "node dist/YOUR_PROJECT_NAME/server.js",
  "webpack:server": "webpack --config webpack.server.config.js"
},
Then run npm run build:ssr && npm run serve:ssr to test your app locally on localhost:4000.
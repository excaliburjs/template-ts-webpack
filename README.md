# Excalibur TypeScript & Webpack Example

This is a barebones Excalibur example in Typescript 4 & Webpack 5. This repo is a template and can be used to [create your own repository](https://github.com/excaliburjs/template-ts-webpack/generate) in GitHub.

Other larger samples:

* [Platformer](https://github.com/excaliburjs/sample-platformer)
* [Shoot 'em Up](https://github.com/excaliburjs/sample-shootemup)

## Running locally

* Using [Node.js](https://nodejs.org/en/) 14 (LTS) and [npm](https://www.npmjs.com/)
* Run the `npm install` to install dependencies
* Run the `npm start` to run the development server to test out changes
   * [Webpack](https://webpack.js.org/) will build the [Typescript](https://www.typescriptlang.org/) into Javascript
   * [Webpack dev server](https://webpack.js.org/configuration/dev-server/) will host the script in a little server on http://localhost:8080/

## Building bundles

* Run `npm run build:dev` to produce Javascript bundles for debugging in the `dist/` folder
* Run `npm run build:prod` to produce Javascript bundles for production (minified) in the `dist/` folder

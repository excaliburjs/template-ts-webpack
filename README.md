# Excalibur TypeScript & Webpack Starter

This is a barebones [Excalibur](https://excaliburjs.com) game engine starter built using Typescript 4 & Webpack 5. It's a great starting place to jumpstart building your game! This repo is a template and can be used to [create your own repository](https://github.com/excaliburjs/template-ts-webpack/generate) in GitHub.

Check out our [other samples](https://excaliburjs.com/samples) while you build your game or [ask us questions](https://github.com/excaliburjs/Excalibur/discussions).

## Get Started

* Using [Node.js](https://nodejs.org/en/) 14 (LTS) and [npm](https://www.npmjs.com/)
* Run the `npm install` to install dependencies
* Run the `npm start` to run the development server to test out changes
   * [Webpack](https://webpack.js.org/) will build the [Typescript](https://www.typescriptlang.org/) into Javascript
   * [Webpack dev server](https://webpack.js.org/configuration/dev-server/) will host the script in a little server on http://localhost:8080/

## Publishing

* Run `npm run build:dev` to produce Javascript bundles for debugging in the `dist/` folder
* Run `npm run build:prod` to produce Javascript bundles for production (minified) in the `dist/` folder

The `dist/` folder can be deployed to a static web host. We recommend [Netlify](https://netlify.com) or [GitHub Pages](https://pages.github.com/) since they are free to use.
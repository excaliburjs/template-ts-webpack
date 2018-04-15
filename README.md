# Excalibur TypeScript & Webpack Example
This example uses [`Webpack`](https://webpack.github.io/) and [`ts-loader`](https://github.com/TypeStrong/ts-loader) module to compile the TypeScript.

Before you start, install the package via your beloved dependency manager through ```npm install``` or ```yarn install```.

To start debugging your code, run ```start``` for the **development** script. It would compile Excalibur and a whole thing from the **/src** folder into the output **bundle.js** file. You will be able to see a result on ```localhost:8080``` and change your code "on the fly" without recompiling the bundle.

When you are ready to go, compile a **production** version with ```build``` script or choose the appropriate task from VSCode, then check out the **/dist** folder.

**Please note:** when running `npm start` or `yarn start`, the webpack-dev-server generates your files virtually so you won't find them in your /dist folder.
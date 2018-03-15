# Excalibur TypeScript & Webpack Example

To run:

    npm install
    npm run dev

    or

    yarn install
    yarn dev


This example uses [`webpack`](https://webpack.github.io/) and
[`ts-loader`](https://github.com/TypeStrong/ts-loader) to compile the TypeScript.
Excalibur is bundled via webpack into the output **bundle.js** file.


** Please note:** 

When running `npm run dev` or `yarn dev` the webpack-dev-server
generates your files virtually so you won't find them in your dist folder.


If you need the files for distribution or etc. use the command `npm run webpack` or
`yarn webpack` instead.

See **webpack.config.js** for the bundle configuration.

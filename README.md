# route.js

## WIP

This repo is actually evolving to solve the problem of routing in our **S**ingle **P**age **A**pplications, it's built with `hashchange` wich has a great compatibility > http://caniuse.com/#feat=hashchange  

You can now get queries directly from `this.query` example : `/path?query=string`

## Usage

### route.create
```
route.create(path, callback)
```
**path** : `string` it can be `/article`  
**callback** : `function` argument is your dom element  

### route.start
```
route.start(path)
```
**path** : `string` it can be `/article`  

If you want to modularize your app with ES6 read the following, explaining modularization with **Webpack** & **Babel**. ~~You can already use standalone **autoroute.js**, it exposes a global object `route` directly available (tends to disappear).~~

## Get Started with ES6

Basic tree
```javascript
/src
  index.html
  main.js
  bundle.js // we'll build it
  /components
    hello-world.js
    autoroute.es6.js
```
#### 1. Install dependencies

Assuming npm is installed, in your project folder run :
```
npm init
npm install -g webpack
npm install babel-loader babel-core babel-preset-es2015 --save-dev
echo '{ "presets": ["es2015"] }' > .babelrc
```

then install **autoroute.js** :

```
npm install autoroute.js
```

#### 2. Config Webpack & Babel
Edit/Add `webpack.config.js` in your project root folder as following :

```javascript
module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + "/src",
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel"
        }
      ]
    }
}
```

#### 3. Some code

***index.html***
```html
<script src="bundle.js"></script>
<router></router>
```

***main.js***
```javascript
import route from 'autoroute.js'
import helloWorld from './components/hello-world'

route.create('/hello', helloWorld)
route.start('/hello')
```

***hello-world.js***
```javascript
export default function helloWorld () {
  this.html += `<h1>Hello ${ this.name || 'Anonymous' }<h1>`
}
```

#### 4. Test/Result 

Run `webpack` and serve your `src` folder with `serve` or `superstatic` or anything else. Then go to `http://localhost:port/#/hello?name=Didier` the result will be :

```
Hello Didier
```

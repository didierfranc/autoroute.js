# route.js

## WIP

This repo is actually evolving to solve the problem of routing in our **S**ingle **P**age **A**pplications, it's built with `hashchange` wich has a great compatibility > http://caniuse.com/#feat=hashchange  

You can now get queries directly from `this.query` example : `/path?query=string`

## Usage

### route.create
```
route.create(path, selector, callback)
```
**path** : `string` it can be `/article`  
**selector** : `string` it can be `tag`, `class`, `id`  
**callback** : `function` argument is your dom element  

You can use standalone **autoroute.js**, it exposes a global object `route` directly available. If you want to modularize your app with ES6 read the following, explaining modularization with **Webpack** & **Babel**.

## Get Started with ES6

Basic tree
```javascript
/src
  index.html
  main.js
  bundle.js // we'll build it
  /components
    hello-world.js
```
#### 1. Install dependencies

Assuming npm is installed, in your project folder run :
```
npm init
npm install -g webpack
npm install babel-loader babel-core babel-preset-es2015 --save-dev
echo '{ "presets": ["es2015"] }' > .babelrc
```

#### 2. Config Webpack & Babel
Edit/Add `webpack.config.js` in your project root folder as following :

```javascript
var path = require('path');

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
<hello/>
```

***main.js***
```javascript
import route from './components/route'
import helloWorld from './components/hello-world'

route.create('/hello', 'hello', helloWorld)
route.start()
```

***hello-world.js***
```javascript
export default function helloWorld () {
  this.html += `<h1>Hello ${ this.name || 'Anonymous' }<h1>`
}
```

#### 4. Result 

To test it serve your `src` folder with `serve` or `superstatic` or anything else. Then go to `http://localhost:port/#/hello?name=Didier` the result will be :

```
Hello Didier
```

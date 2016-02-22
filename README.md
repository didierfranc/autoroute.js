# autoroute.js

This repo is actually evolving to solve the problem of routing in our **S**ingle **P**age **A**pplications, it's built with `hashchange` wich has a great compatibility > http://caniuse.com/#feat=hashchange  

## Changes

**1.0.9**

- A new global `domChange` event to handle action when DOM is updated.
- `this.on()` listen ***scoped*** & ***global*** events (`link`)
- Add `link` attribute to any html tag (eg : `<h1 link="route?query=string">Click Me</h2>`)
- HammerJS is now a part of Autoroute.js, for `link` attribute and future interactions.

**1.0.7**

- Get queries directly from `/path?query=string` with `this.query`.

## Usage

### 1. Main
#### route.create
```javascript
route.create(path, callback)
```
**path** : `string` it can be `/article`  
**callback** : `function` a function to make things when route is matching path

### route.start
```javascript
route.start(path)
```
**path** : `string` it can be `/article`  


### 2. Module

Inside your module, see `hello-world.js` in the following you can use that `this` methods :

#### this.html
```javascript
this.html += `some html`
```

#### this.on()
```javascript
this.on(event, callback)
```

At this time, Autoroute.js add a `link` event which works with link attribute.  

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
<section id="router"></section>
```

***main.js***
```javascript
import route from 'autoroute.js'
import helloWorld from './components/hello-world'
import bye from './components/ye'

route.create('/hello', helloWorld)
route.create('/bye', bye)
route.start('/hello')
```

***hello-world.js***
```javascript
export default function helloWorld () {
  this.html += `<h1>Hello ${ this.name || 'Anonymous' }<h1>
                <h2 link="bye?name="${ this.name || 'Anonymous' }"></h2>`
}
```

***bye.js***
```javascript
export default function bye () {
    this.on('link', () => {
      this.html += `Bye bye ${ this.name || 'Anonymous' }`
  })
}
```

#### 4. Test/Result 

Run `webpack` and serve your `src` folder with `serve` or `superstatic` or anything else. Then go to `http://localhost:port/#/hello?name=Didier` the result will be :

```
Hello Didier
```

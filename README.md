# autoroute.js

This repo is actually evolving to solve the problem of routing in our **s**ingle **p**age **a**pplications, especially on mobile. It's built on top of `hashchange` wich has a [great compatibility](http://caniuse.com/#feat=hashchange).

## Changes

**1.0.11**

- Full rewrite

**1.0.9**

- HammerJS is now part of Autoroute.js, the best way to handle touch gestures.
- Add `link` attribute to any html tag, eg : `<h1 link="route?query=string">Click Me</h2>`.
- A `tap` on element with `link` attribute dispatches `link` event inside the scope.
- Autoroute.js uses HammerJS `tap` for `link` attribute and future interactions.

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

Inside your module you can do this, see `hello-world.js` or `bye.js` in the following :

#### this.html
```javascript
this.html += `some html`
```

#### this.q
```javascript
this.html += `Hello ${ this.q.name }` // hello?name=Didier
```

#### this.anim
```javascript
this.anim = true // default 'false'
```

Every module is rendered once on `route.start()`. If you have query in your `hash`, the module will be re-rendered when `hash` will match module route. If you don't use query in your module and you need to re-render every times :

```html
<li link="path?">Go somewhere<li> // Just add question mark
```

~~If you want to modularize your app with ES6~~ Read the following, explaining modularization with **Webpack** & **Babel**.

## Get Started with ES6

Basic tree
```javascript
/src
  index.html
  main.js
  bundle.js // we'll build it
  /components
    hello.js
    bye.js
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
          exclude: /node_modules\/(?!autoroute)/,
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
import hello from './components/hello'
import bye from './components/bye'

route.create('/hello', helloWorld)
route.create('/bye', bye)
route.start('/hello')
```

***hello-world.js***
```javascript
export default function helloWorld () {
  this.html += `<h1>Hello ${ this.q.name || 'Anonymous' }<h1>
                <h2 link="bye?name="${ this.q.name || 'Anonymous' }"></h2>`
}
```

***bye.js***
```javascript
export default function bye () {
  this.on('link', () => {
      this.html += `Bye bye ${ this.q.name || 'Anonymous' }`
  })
}
```

#### 4. Test/Result

Run `webpack` and serve your `src` folder with `serve` or `superstatic` or anything else. Then go to `http://localhost:port/#/hello?name=Didier` the result will be :

```
Hello Didier
```

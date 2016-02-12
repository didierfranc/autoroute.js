# route.js

## WIP

This repo is actually evolving to solve the problem of routing in our **S**ingle **P**age **A**pplications, it's built with `hashchange` wich has a great compatibility > http://caniuse.com/#feat=hashchange

## Usage

Autoroute expose a global fonction `route`

### route.create
```
route.create(path, selector, callback)
```
**path** : `string` it can be `/article`  
**selector** : `string` it can be `tag`, `class`, `id`  
**callback** : `function` argument is your dom element  

## Example

You can now get queries, example with : `/hello?name=Didier`

```html
<body>
  <hello></hello>
  <bye></bye>
</body>
```

**ES6 :** 

```javascript
route.create('/hello', 'hello', helloWorld)
route.create('/bye', 'bye', goodBye)

function helloWorld () {
  this.html += `<h1>Hello ${ this.name || 'Anonymous' }<h1>`
}

function goodBye () {
  this.html += `<h1>Bye ${ this.name || 'Anonymous' }<h1>`
}
```

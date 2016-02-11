# route.js

## WIP

This repo is actually evolving to solve the problem of routing in our **S**ingle **P**age **A**pplications, it's built with `hashchange` wich has a great compatibility > http://caniuse.com/#feat=hashchange

## Usage

Autoroute expose a global fonction `route`

### route.create
```
route.create(path, selector, callback)
```
**route** : `string` it can be `/article`  
**selector** : `string` it can be `tag`, `class`, `id`  
**callback** : `function` argument is your dom element  

## Example

```html
<body>
  <hello></hello>
  <bye></bye>
</body>
```

**ES6 :** 

```javascript
var name = 'Didier Franc'

route.create('/hello', 'hello', helloWorld)
route.create('/bye', 'bye', goodBye)

function helloWorld (el) {
  el.innerHTML = `<h1>Hello ${ name }<h1>`
}

function goodBye (el) {
  el.innerHTML = `<h1>Bye ${ name }<h1>`
}

</script>

```

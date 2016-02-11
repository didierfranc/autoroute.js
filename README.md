# route.js

## WIP

This repo is actually evolving to solve the problem of routing in our **S**ingle **P**age **A**pplications

## Usage

Autoroute expose a global fonction `_.route`

### _.route
```
_.route(path, selector, callback)
```
**route** : `string` it can be `/article`  
**selector** : `string` it can be `tag`, `class`, `id`  
**callback** : `function` argument is your dom element  

## Example

```html
<body>
  <my-component></my-component>
</body>
```

```javascript
_.route('/hello', 'my-component', helloWorld)

function helloWorld (el) {
  el.innerHTML = 'Hello World !'
}
```

import Touch from 'hammerjs'

var route = {
  create : create,
  start : start,
  routes : {},
  t : { link : [], back : [], tap : [] }
}

function create (path, fn) {

  var e = document.createElement(path)
  document.getElementById('router').appendChild(e)

  e.className = 'route hide'
  e.slide = false
  e.q = {}

  e.submit = submit
  e.check = check
  e.set = set
  e.render = render
  e.html = ''

  e.init = e.refresh = () => {
    fn.call(e)
    e.render()
    e.slide ? e.style.zIndex = '2' : e.style.zIndex = '1'
  }

  e.init()
  route.routes[path] = e
}

function el (element, fn) {
  var els = document.querySelectorAll(element)
  for (var i = 0; i < els.length; i++) {
    fn(els[i], i)
  }
}

function render () {
  if (this.html != '') {
    this.innerHTML = this.html
    this.html = ''
    linkify()
  }
}

function start (path) {
  window.location.hash = '/'
  if (!path) path = ''
  setTimeout(() => hash('/' + path), 0)
  stylify()
}

function linkify () {

  if ( route.t.link[0] ) {
    route.t.link.forEach( e => e.destroy() )
    route.t.back.forEach( e => e.destroy() )
    route.t.tap.forEach( e => e.destroy() )
  }

  el('[link]', (el, i) => {
    route.t.link[i] = new Touch.Manager(el)

    route.t.link[i].add(new Touch.Tap())
    route.t.link[i].on('tap', ev => {

      if (!ev.target.hasAttribute('link')) {
        while (!ev.target.hasAttribute('link')) {
          ev.target = ev.target.parentElement
        }
        window.location.hash = '/' + ev.target.getAttribute('link')
      } else {
        window.location.hash = '/' + ev.target.getAttribute('link')
      }

      if (ev.target.offsetParent.tagName == 'FOOTER') {
        document.querySelectorAll('footer .active')[0].classList.remove('active')
        ev.target.classList.add('active')
      }

    })
  })

  el('[back]', (el, i) => {
    route.t.back[i] = new Touch.Manager(el)
    route.t.back[i].add(new Touch.Tap())

    route.t.back[i].on('tap', () => {
      if ( typeof cordova != 'undefined'
        && typeof cordova.plugins.Keyboard != 'undefined')
      cordova.plugins.Keyboard.close()

      history.go(-1)
    })
  })

  el('[ontap]', (el, i) => {
    route.t.tap[i] = new Touch.Manager(el)
    route.t.tap[i].add(new Touch.Tap())

    route.t.tap[i].on('tap', ev => {
      var fn = () => eval(ev.target.getAttribute('ontap'))
      fn.call(route.routes[window.location.hash.split('#/')[1].split('?')[0]])
    })

  })

}

function submit (fn) {
  this.addEventListener('submit', ev => {
    ev.preventDefault()
    var form = this.getElementsByTagName('form')[0]
    var e = false

    for (var i = 0; i < form.length; i++) {
      if (form[i].error || form[i].value == '') e = true
    }

    !e ? fn(form) : console.log('Your form inputs are generating some errors.')
  })
}

function check (name, fn) {
  this.addEventListener('input', ev => {
    var p = ev.target
    if (ev.target.name == name) fn(p)
  })
}

function set (obj) {

  this.render()
  var form = this.getElementsByTagName('form')[0]

  for (let input in obj) {

    form[input]
      ? form[input].value = obj[input]
      : console.log('It seems you want to set value to an inexistant input.')
  }

}

function hash (path) {

  window.location.hash = path
  window.addEventListener('hashchange', ev => {

    var newH = ev.newURL ? ev.newURL.split('#/')[1].split('?') : []
    var oldH = ev.oldURL ? ev.oldURL.split('#/')[1].split('?') : []

    if (route.routes[newH[0]]) {

      if (newH[1]) {
        var q = newH[1].split('&')
        for (var i = 0; i < q.length; i++) {
          var a = q[i].split('=')
          route.routes[newH[0]].q[a[0]] = a[1]
        }
        route.routes[newH[0]].init()
      }

      if (route.routes[newH[0]].slide) {

        route.routes[newH[0]].classList.remove('hide')
        route.routes[newH[0]].classList.remove('out')
        route.routes[newH[0]].classList.add('in')
        setTimeout(function(){ route.routes[oldH[0]].classList.add('hide') }, 300)
        el('[back]', e => e.classList.remove('hide') )

      } else if (route.routes[oldH[0]] && route.routes[oldH[0]].slide) {

        route.routes[newH[0]].classList.remove('hide')
        route.routes[oldH[0]].classList.remove('in')
        route.routes[oldH[0]].classList.add('out')
        el('[back]', e => e.classList.add('hide') )

      } else {

        route.routes[newH[0]].classList.remove('hide')
        if (route.routes[oldH[0]]) route.routes[oldH[0]].classList.add('hide')

      }
    }
  })
}

function stylify () {

  let r = document.getElementById('router').style.height
  var css = document.createElement('autorouthings')
  css.innerHTML =
  `
  <style>
  * {
    padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: none !important;
    font-family: sans-serif;
    font-weight: 300
  }

  *:not(input) {
    -webkit-user-select: none
  }

  ::-webkit-scrollbar {
    display:none
  }

  body, #router {
    display: block;
    position: absolute;
    width: 100%;
    background-color: #fafafa;
    overflow: hidden;
    min-height: ${ r }
  }

  .route {
    display: block;
    position: absolute;
    width: 100%;
    height: ${ r };
    background-color: #fafafa;
    animation-duration: 0.3s;
    animation-delay: 0s;
    animation-fill-mode: both
  }

  .route > .scroll {
    height: ${ r };
  }

  .scroll {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .hide {
    display : none
  }

  @-webkit-keyframes slideInRight {
    from {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
      visibility: visible
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  .in {
    -webkit-animation-name: slideInRight
  }

  @-webkit-keyframes slideOutRight {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0)
    }
  }

  .out {
    -webkit-animation-name: slideOutRight;
    animation-name: slideOutRight
  }
  </style>
  `
  document.body.appendChild(css)
}

export default route

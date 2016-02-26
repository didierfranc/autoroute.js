import Touch from 'hammerjs'

var route = {
  create : create,
  start : start,
  routes : {},
  t : []
}

function create (path, fn) {

  path = path.slice(1)

  var e = document.createElement(path)
  document.getElementById('router').appendChild(e)

  e.innerHTML = e.html = ''
  e.className = 'route hide'
  e.anim = false
  e.q = {}

  e.render = () => {
    fn.call(e)
    e.anim ? e.style.zIndex = '2' : e.style.zIndex = '1'
    e.innerHTML = e.html
    e.html = ''
  }

  e.render()
  route.routes[path] = e

}

function el (element, fn) {
  var els = document.querySelectorAll(element)
  for (var i = 0; i < els.length; i++) {
    fn(els[i], i)
  }
}

function linkify () {

  route.t.forEach( e => e.destroy() )
  route.t = []

  el('[link]', (el, i) => {

    route.t[i] = new Touch(el, { touchAction: 'pan-x pan-y' })
    route.t[i].on('tap', ev => {

      window.location.hash = '/' + ev.target.getAttribute('link')

      if ( !window.location.hash.split('?')[1] ) {
        document.querySelectorAll('.active')[0].classList.remove('active')
        ev.target.classList.add('active')
      }

    })
  })
}

function start (path) {
  window.location.hash = path
  linkify()
}

export default route

window.location.hash = '/'
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
      route.routes[newH[0]].render()
    }

    if (route.routes[newH[0]].anim) {

      route.routes[newH[0]].classList.remove('hide')
      route.routes[newH[0]].classList.remove('out')
      route.routes[newH[0]].classList.add('in')
      setTimeout(function(){ route.routes[oldH[0]].classList.add('hide') }, 300)

    } else if (route.routes[oldH[0]] && route.routes[oldH[0]].anim) {

      route.routes[newH[0]].classList.remove('hide')
      route.routes[oldH[0]].classList.remove('in')
      route.routes[oldH[0]].classList.add('out')

    } else {

      if (route.routes[oldH[0]]) route.routes[oldH[0]].classList.add('hide')
      route.routes[newH[0]].classList.remove('hide')

    }

  }
})

var h,f
el('header', e => h = e.offsetHeight)
el('footer', e => f = e.offsetHeight)

var css = document.createElement('style')
css.innerHTML =
`
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

html {
  background-color: #fafafa
}

body, #route {
  display: block;
  position: absolute;
  width: 100%;
  overflow: hidden
}

a {
  text-decoration: none;
  color: black
}

.route {
  display: block;
  position: absolute;
  width: 100%;
  height: ${ window.innerHeight - f - h - 20 + 'px' };
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #fafafa;
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-fill-mode: both
}

.hide {
  visibility : hidden
}

@-webkit-keyframes slideInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.in {
  -webkit-animation-name: slideInRight;
}

@-webkit-keyframes slideOutRight {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}

.out {
  -webkit-animation-name: slideOutRight;
  animation-name: slideOutRight;
}
`
document.body.appendChild(css)

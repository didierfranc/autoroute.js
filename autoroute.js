import Touch from 'hammerjs'

var route = {
  create : create,
  start : start,
  hide : hide,
  routes : {},
  t : []
}

function create (path, fn) {

  path = path.slice(1)

  var e = document.createElement(path)
  document.getElementById('router').appendChild(e)

  e.innerHTML = e.html = ''
  e.classList.add('route')

  e.fn = function () {
    fn.call(e)
    e.innerHTML = e.html
    e.html = ''
  }

  e.show = function () {
    e.style.display = 'block'
  }

  e.q = {}
  e.fn()

  route.routes[path] = e
}

function el (element, callback) {
  var els = document.querySelectorAll(element)
  for (var i = 0; i < els.length; i++) {
    callback(els[i], i)
  }
}

function linkify () {

  route.t.forEach(function (e) { e.destroy() })
  route.t = []

  el('[link]', function (el, i) {

    route.t[i] = new Touch(el, { touchAction: 'pan-x pan-y' })
    route.t[i].on('tap', function(ev) {

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

function hide () {
  for (var item in this.routes) {
    this.routes[item].style.display = 'none'
  }
}

export default route

window.location.hash = '/'
window.addEventListener('hashchange', function (ev) {

  var newH = ev.newURL ? ev.newURL.split('#/')[1].split('?') : []
  var oldH = ev.oldURL ? ev.oldURL.split('#/')[1].split('?') : []

  if (route.routes[newH[0]]) {

    if (newH[1]) {

      var q = newH[1].split('&')

      for (var i = 0; i < q.length; i++) {
        var a = q[i].split('=')
        route.routes[newH[0]].q[a[0]] = a[1]
      }

      route.hide()
      route.routes[newH[0]].fn()
      route.routes[newH[0]].show()

    } else {

      route.hide()
      route.routes[newH[0]].show()

    }

  }

})

var h,f
el('header', e => h = e.offsetHeight )
el('footer', e => f = e.offsetHeight )

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
  z-index: 1;
  width: 100%;
  height: ${ window.innerHeight - f - h - 20 + 'px' };
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #fafafa;
  animation-duration: 0.3s;
  animation-delay: 0s
}
`
document.body.appendChild(css)

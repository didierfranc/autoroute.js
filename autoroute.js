var Touch = require('hammerjs')

var route = {}
var w = window
var l = w.location

route.create = function (path, next) {

  var e = document.createElement(path.slice(1))
  e.innerHTML = e.html = ''

  e.on = function ( event, callback ) {

    e.addEventListener(event, function(){
      callback()
      e.render()
    })

  }

  var p = document.querySelectorAll('#router')[0]
  p.appendChild(e)

  e.link = new Event('link')

  var show = function () { e.style.display = 'block' }
  var hide = function () { e.style.display = 'none' }

  e.render = function () {
    e.innerHTML = e.html
    e.html = ''
  }

  next.call(e)
  e.render()

  w.addEventListener("hashchange", function () {

    var p = l.hash.slice(2).split('?')

    if (p[1]) {

      var q = p[1].split('&')

      for (var i = 0; i < q.length; i++) {
        var a = q[i].split('=')
        e[a[0]] = a[1]
      }

      if ( path.slice(1) == p[0] && p[1]) { e.dispatchEvent(e.link) }

    }

    path.slice(1) == p[0] ? show() : hide()
  })
}

route.start = function (path) {
  l.hash = path
  l.hash == '' ? l.hash = '/' : l.hash = path
  w.dispatchEvent(new HashChangeEvent("hashchange"))
}

module.exports = route

var target = document.getElementById('router')
var observer = new MutationObserver(onDomChange)
var config = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree : true,
  attributeFilter : ['href']
}

observer.observe(target, config)

w.domChange = new Event('domChange')

function onDomChange () {
  w.dispatchEvent(domChange)
  console.log('dom updated')
  linkify()
}

var touchable = []

function linkify () {

  touchable.forEach(function(e){
    e.destroy()
  })

  touchable = []

  var els = document.body.querySelectorAll('[link]')

  for (var i = 0; i < els.length; i++) {

    touchable[i] = new Touch(els[i], {
      touchAction: 'pan-x pan-y'
    })

    touchable[i].on('tap', function(ev) {

        var el = ev.target
        l.hash = '/' + el.getAttribute('link')

        if ( !l.hash.split('?')[1] ) {

          document.querySelectorAll('.active')[0].classList.remove('active')
          el.classList.add('active')
        }

    })
  }
}

w.el = function (element, callback) {
  var els = document.querySelectorAll(element)

  for (var i = 0; i < els.length; i++) {
    callback(els[i])
  }
}

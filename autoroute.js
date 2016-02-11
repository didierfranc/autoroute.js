var route = {}
var w = window
var l = w.location

// Register routes on hashchange event
route.create = function (route, element, next) {

  w.addEventListener("hashchange", function () {

      var p = l.hash.slice(2).split('?')
      var e = document.querySelectorAll(element)
      var q = {}

      for (var i = 0; i < p.length; i++) {
        var a = p[1].split('&')[i].split('=')
        e[0][a[0]] = a[1]
      }

      if ( route.slice(1) == p[0] ) {
        next.call(e[0], q)
      } else {
        e[0].innerHTML = ''
      }

  })

}

// Set a proper root
if ( l.hash == '' ){
  l.hash = '/'
}

// Fire hashchange once to set the route
setTimeout(function(){
  w.dispatchEvent(new HashChangeEvent("hashchange"))
}, 0)

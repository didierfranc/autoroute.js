var route = {}
var w = window
var l = w.location

// Register routes on hashchange event
route.create = function (route, query, next) {

  w.addEventListener("hashchange", function () {

      console.log('fired')
      var a = l.hash.slice(2).split('/')
      var el = document.querySelectorAll(query)

      if ( route.slice(1) == a[0] ) {
        next.call(el[0])
      } else {
        el[0].innerHTML = ''
      }
      
  })

}

// Set a proper root
if ( l.hash == '' ){
  l.hash = '/'
}

// Fire hashchange one to set the route
setTimeout(function(){
  w.dispatchEvent(new HashChangeEvent("hashchange"))
}, 0)

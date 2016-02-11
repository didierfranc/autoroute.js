var _ = {}
var w = window
var l = w.location

if ( l.hash == '' ){
  l.hash = '/'
}

_.route = function route(route, query, next){

  w.addEventListener("hashchange", function(){

    var x = l.hash.slice(2)
    var el = document.querySelectorAll(query)[0]

    if ( route.slice(1) == a[0] ) {
      next(el)
    } else {
      el.innerHTML = ''
    }

  })

  w.dispatchEvent(new HashChangeEvent("hashchange"))

}

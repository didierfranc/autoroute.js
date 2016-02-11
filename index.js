var _ = {}
var w = window
var l = w.location

if ( l.hash == '' ){
  l.hash = '/'
}

_.route = function route(arg, query, next){

  w.addEventListener("hashchange", function(){

    var x = l.hash.slice(2)
    var a = x.split('/')
    var el = document.querySelectorAll(query)[0]

    if ( arg.slice(1) == a[0] ) {
      next(el)
    } else {
      el.innerHTML = ''
    }

  })

  w.dispatchEvent(new HashChangeEvent("hashchange"))

}

var _ = {}
var w = window

_.route = function route(arg, query, next){

  w.addEventListener("hashchange", function(){

    var x = hash()
    var a = x.split('/')
    var el = document.querySelectorAll(query)[0]

    if ( arg.slice(1) == a[0] ) {
      next(el)
    }else {
      el.innerHTML = ''
    }

  })

  w.dispatchEvent(new HashChangeEvent("hashchange"))

}

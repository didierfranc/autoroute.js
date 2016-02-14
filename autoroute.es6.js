var route = {}

route.create = function (path, element, next) {

  var w = window
  var l = w.location
  l.hash == '' ? l.hash = '/' :

  w.addEventListener("hashchange", function () {

    var e = document.querySelectorAll(element)[0]

    function clear () { e.html = e.innerHTML = '' }
    function render () { clear(); next.call(e); e.innerHTML = e.html }


    var p = l.hash.slice(2).split('?')

    if (p[1]) {

      var q = p[1].split('&')

      for (var i = 0; i < q.length; i++) {
        var a = q[i].split('=')
        e[a[0]] = a[1]
        }
    }

    path.slice(1) == p[0] ? render() : clear()

  })
}

route.start = function (){
  setTimeout(function(){ window.dispatchEvent(new HashChangeEvent("hashchange")) }, 0)
}

export default route

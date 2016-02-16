var w = window
var l = w.location
var route = {}

route.create = (path, next) => {

  var e = document.createElement(path.slice(1))
  var p = document.getElementsByTagName('route')[0]
  p.appendChild(e)

  w.addEventListener("hashchange", () => {

    var clear = () => e.html = e.innerHTML = ''
    var render = () => { clear(); next.call(e); e.innerHTML = e.html }

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

route.start = path => {
  l.hash = path
  route.refresh()
}

route.refresh = () => {
  l.hash == '' ? l.hash = '/' :
  setTimeout( () => { w.dispatchEvent(new HashChangeEvent("hashchange")) }, 0)
}

export default route

var route = {}

;(function(){

  var w = window
  var l = w.location
  
  // Set a proper root
  l.hash == '' ? l.hash = '/' :
  
  // Fire 'hashchange' event once
  setTimeout(function(){ w.dispatchEvent(new HashChangeEvent("hashchange")) }, 0)

  // Set route.create as global fn
  window.route.create = function (path, element, next) {

    var e = document.querySelectorAll(element)[0]
    
    e.clear = function () { e.html = e.innerHTML = '' }
    e.render = function () { e.clear(); next.call(e); e.innerHTML = e.html }

    w.addEventListener("hashchange", function () {

      var p = l.hash.slice(2).split('?')

      if (p[1]) {

        var q = p[1].split('&')

        for (var i = 0; i < q.length; i++) {
          var a = q[i].split('=')
          e[a[0]] = a[1]
        }
        
      }

      path.slice(1) == p[0] ? e.render() : e.clear()

    })
  }

})()

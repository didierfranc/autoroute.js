import { el } from './dom'
import stylify from './style'
import route from '../index.js'
import { slideIn, slideOut } from '../modules/slide'

const hash = (path) => {

  window.location.hash = path
  window.addEventListener('hashchange', ev => {

    let newH = ev.newURL ? ev.newURL.split('#/')[1].split('?') : []
    let oldH = ev.oldURL ? ev.oldURL.split('#/')[1].split('?') : []

    let n = route.routes[newH[0]]
    let o = route.routes[oldH[0]]

    if (n) {

      if (newH[1]) {
        var q = newH[1].split('&')
        for (var i = 0; i < q.length; i++) {
          var a = q[i].split('=')
          n.q[a[0]] = a[1]
        }
        n.init()
      }

      if (!n.slide && o && !o.slide || !o) {
        n.classList.remove('hide')
        if (o) o.classList.add('hide')
      } else {
        if (n.slide) { slideIn(n, o) }
        if (o.slide) { slideOut(n, o) }
      }

    }
  })
}

export const start = (path) => {
  window.location.hash = '/'
  if (!path) path = ''
  setTimeout(() => hash('/' + path), 0)
  stylify()
}

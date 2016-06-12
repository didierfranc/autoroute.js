import { el } from './dom'
import route from '../index.js'
import Touch from 'hammerjs'

const linkify = () => {

  if ( route.t.link[0] ) {
    route.t.link.forEach( e => e.destroy() )
    route.t.tap.forEach( e => e.destroy() )
  }

  el('[link]', (el, i) => {
    route.t.link[i] = new Touch.Manager(el)

    route.t.link[i].add(new Touch.Tap())
    route.t.link[i].on('tap', ev => {

      if (!ev.target.hasAttribute('link')) {
        while (!ev.target.hasAttribute('link')) {
          ev.target = ev.target.parentElement
        }
        window.location.hash = '/' + ev.target.getAttribute('link')
      } else {
        window.location.hash = '/' + ev.target.getAttribute('link')
      }

      if (ev.target.offsetParent.tagName == 'FOOTER') {
        document.querySelectorAll('footer .active')[0].classList.remove('active')
        ev.target.classList.add('active')
      }

    })
  })

  el('[ontap]', (el, i) => {
    route.t.tap[i] = new Touch.Manager(el)
    route.t.tap[i].add(new Touch.Tap())

    route.t.tap[i].on('tap', ev => {
      var fn = () => eval(ev.target.getAttribute('ontap'))
      fn.call(route.routes[window.location.hash.split('#/')[1].split('?')[0]])
    })
  })
}

export default linkify

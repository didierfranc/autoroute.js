import { set, check, submit } from './form.js'
import { render } from './dom'
import route from '../index.js'

const create = (path, fn) => {

  var e = document.createElement(path)
  document.getElementById('router').appendChild(e)

  e.submit = submit
  e.set = set
  e.check = check
  e.render = render
  e.html = ''
  e.className = 'route hide'
  e.q = {}
  e.slide = false

  e.init = e.refresh = () => {
    fn.call(e)
    e.render()
    e.slide ? e.style.zIndex = '2' : e.style.zIndex = '1'
  }

  e.init()
  route.routes[path] = e
}

export default create

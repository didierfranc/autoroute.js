import linkify from './links'

export const el = (element, fn) => {
  var els = document.querySelectorAll(element)
  for (var i = 0; i < els.length; i++) {
    fn(els[i], i)
  }
}

export function render () {
  if (this.html != '') {
    this.innerHTML = this.html
    this.html = ''
    linkify()
  }
}

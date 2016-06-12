export const slideIn = (n, o) => {

  n.classList.remove('hide')
  n.classList.remove('out')
  n.classList.add('in')

  setTimeout(function() {  o.classList.add('hide') }, 300)

}

export const slideOut = (n, o) => {

  o.classList.add('out')
  n.classList.remove('hide')

}

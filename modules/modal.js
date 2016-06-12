import { el } from '../core/dom'

const modal = (content) => {

    var modal = document.createElement('div')
    modal.innerHTML = content
    modal.classList.add('modal')
    el('#router', e => e.appendChild(modal))

    modal.style.top = window.innerHeight / 2 - modal.offsetHeight / 2  + 'px'
    modal.style.left = window.innerWidth / 2 - modal.offsetWidth / 2  + 'px'

    el('.scroll', e => e.style.filter = 'blur(10px)')

    setTimeout(function () {
      el('.scroll', e => e.style.filter = 'blur(0px)')
      modal.remove()
    }, 1000)

}

export default modal

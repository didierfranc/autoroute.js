export const submit = (fn) => {
  this.addEventListener('submit', ev => {
    ev.preventDefault()
    var form = this.getElementsByTagName('form')[0]
    var e = false

    for (var i = 0; i < form.length; i++) {
      if (form[i].error || form[i].value == '') e = true
    }

    !e ? fn(form) : console.log('Your form inputs are generating some errors.')
  })
}

export const check = (name, fn) => {
  this.addEventListener('input', ev => {
    var p = ev.target
    if (ev.target.name == name) fn(p)
  })
}

export const set = (obj) => {

  this.render()
  var form = this.getElementsByTagName('form')[0]

  for (let input in obj) {

    form[input]
      ? form[input].value = obj[input]
      : console.log('It seems you want to set value to an inexistant input.')
  }
}

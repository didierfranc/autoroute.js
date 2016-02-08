window.addEventListener("hashchange", route)

function load (url, id, next) {

  var formated = 'tmplt/' + url + '.html'

  var request = new XMLHttpRequest();
  request.open('GET', formated, true);

  request.onload = function() {
    var resp = this.responseText;
    var el = document.getElementById(id)

    el.innerHTML = resp

    var arr = el.getElementsByTagName('script')
    
    for (var i = 0; i < arr.length; i++) {
      eval(arr[i].innerHTML)
    }

    if (next){
      next()
    }
  }
  request.send()
}

function route(){

  var x = hash()
  var a = x.split('--')

  if (a[1]){
    load( a[0], 'content', function(){
      load( a[1], 'nested')
    })

  }else{
    load( a[0] , 'content' )
  }
}

function hash (a) {
  if(a){
    window.location.hash = '#/' + a
    route()
  }

  else{
    var h = window.location.hash
        h = h.slice(2)
    return h
  }
}

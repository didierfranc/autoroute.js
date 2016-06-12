const stylify = () => {

  let r = document.getElementById('router').style.height

  var css = document.createElement('autorouthings')
  css.innerHTML =
  `
  <style>
  * {
    padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: none !important;
    font-family: sans-serif;
    font-weight: 300
  }

  *:not(input) {
    -webkit-user-select: none
  }

  ::-webkit-scrollbar {
    display:none
  }

  body, #router {
    display: block;
    position: absolute;
    width: 100%;
    background-color: #fafafa;
    overflow: hidden;
    min-height: ${ r || '500px' };
  }

  .route {
    display: block;
    position: absolute;
    width: 100%;
    height: ${ r };
    background-color: #fafafa;
    animation-duration: 0.3s;
    animation-delay: 0s;
    animation-fill-mode: both
  }

  .route > .scroll {
    height: ${ r };
  }

  .scroll {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .hide {
    display : none
  }

  @-webkit-keyframes slideInRight {
    from {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
      visibility: visible
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  .in {
    -webkit-animation-name: slideInRight
  }

  @-webkit-keyframes slideOutRight {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0)
    }
  }

  .out {
    -webkit-animation-name: slideOutRight;
    animation-name: slideOutRight
  }
  </style>
  `
  document.body.appendChild(css)

}

export default stylify

!(function(window, document) {
  // some jquery-esque functions
  function $1(selector, context) {
    return (context || document).querySelector(selector);
  }
  function css(el, styles) {
    for (var property in styles)
      el.style[property] = styles[property];
  }
  
  // fade in the subtitle
  var $clean = $1('.clean');
  var $dash = $1('.dash');
  function fadeIn() {
    if (document.hidden) {
      return false;
    }
    setTimeout(function() {
      css($clean, {opacity: 1});
    }, 800);
    setTimeout(function() {
      css($dash, {opacity: 1});
    }, 1900);
    return true;
  }
  function onVisChange() {
    if (fadeIn()) {
      document.removeEventListener('visibilitychange', onVisChange);
    }
  }
  window.onload = function() {
    // make sure tab is visible when animation runs
    if (!fadeIn()) {
      document.addEventListener('visibilitychange', onVisChange);
    }
  };
  
  // size the triangles (border between hero and resume)
  var $triangle = $1('.tri-left');
  var $triangle2 = $1('.tri-right');
  function onResize() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    css($triangle, {
      borderWidth: '0 ' + Math.floor(width * 0.5).toString() + 'px 15px 0',
      opacity: 1
    });
    css($triangle2, {
      borderWidth: '0 0 25px ' + Math.floor(width * .33).toString() + 'px',
      opacity: 1
    });
  }
  // run initially and on resize
  window.onresize = onResize;
  onResize();

})(window, document);

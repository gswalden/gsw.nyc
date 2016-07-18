!(function(window, document) {

  var myWords = [
    'feel good',
    'are best',
    'cost less',
    'make sense',
    'look better',
    'get mentioned',
    'are noticed',
    'give hugs',
    'make love',
    'rule',
    'clean up',
    'are responsive',
    'have pride',
    'make news',
    'get awarded',
    'own',
    'respond',
    'beat slow',
    'win',
    'make smiles',
    'stick',
    'are a dream',
    'are my fav',
  ];

  var time = Math.round(4500 / myWords.length);
  var headline = document.getElementById('headline');
  var finalText = headline.innerHTML;

  function getNext() {
    if (myWords.length) {
      setTimeout(function() {
        headline.innerHTML = myWords.shift();
        getNext();
      }, time);
      time -= 5;
    } else {
      headline.style.opacity = 0;
      setTimeout(function() {
        headline.style.transition = 'opacity 3s ease-in-out';
        headline.innerHTML = finalText;
        headline.style.fontWeight = 700;
        headline.style.opacity = 1;
        if (store) store.setItem(key, 'false');;
      }, 250);
    }
  }

  function cycleWords() {
    if (document.hidden) {
      return false;
    }
    headline.innerHTML = myWords.shift();
    headline.style.opacity = 1;
    getNext();
    return true;
  }

  function onVisChange() {
    if (cycleWords()) {
      document.removeEventListener('visibilitychange', onVisChange);
    }
  }

  window.onload = function() {
    // make sure tab is visible when animation runs
    if (!cycleWords()) {
      document.addEventListener('visibilitychange', onVisChange);
    }
  };

})(window, document);

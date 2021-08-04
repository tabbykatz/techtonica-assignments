(function() {
  'use strict';

  // It's dangerous to go alone, take these

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const upon = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  // add event listener
  upon('click','#coin',flipper);

  // do the flipping
function flipper() {

  let flipResult = Math.random();
  console.log(flipResult);
  let coin = select('#coin');
  if (flipResult < 0.5) {
    coin.className = "";
    coin.className = "flipHead";
  } else {
    coin.className = "";
    coin.className = "flipTail";
  }
}
})();

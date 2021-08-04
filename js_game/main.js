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
  if (flipResult < 0.5) {
    select('#coin').className = ("flipHead");
  } else {
    select('#coin').className = ("flipTail");
  }
}
})();

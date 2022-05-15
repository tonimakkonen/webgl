
"use strict";

var tmglGl = null;

function tmglInit(element) {
  const canvas = document.querySelector(element);
  tmglGl = canvas.getContext("webgl");
  if (tmglGl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
}

function tmglClear(red, green, blue) {
  tmglGl.clearColor(red, green, blue, 1.0);
  tmglGl.clear(tmglGl.COLOR_BUFFER_BIT);
}

export { tmglInit, tmglClear };

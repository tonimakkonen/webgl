
"use strict";

import { tmiInit, tmiUpdate, tmiKeyDown, tmiKeyClicked, tmiKeyReleased } from '/src/tmin/tmin.js';
import { tmfsInit } from '/src/tmfs/tmfs.js';

// TODO: This is not right
var gl = null;

function main() {

  tmiInit("#glCanvas");
  tmfsInit("#glCanvas");

  const canvas = document.querySelector("#glCanvas");

  // Initialize the GL context
  gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.5, 0.2, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);


  // Loop
  window.requestAnimationFrame(loop);
}

function loop(timestamp) {
  tmiUpdate();

  //console.log(gl.canvas.width);

  gl.clearColor(Math.abs(Math.sin(timestamp / 10000.0)), 0.0, Math.abs(Math.cos(timestamp / 5000.0)), 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  window.requestAnimationFrame(loop);
}

window.onload = main;

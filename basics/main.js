
"use strict";

import { tmiInit, tmiUpdate, tmiKeyDown, tmiKeyClicked, tmiKeyReleased, tmiGetMouse } from '/src/tmin/tmin.js';
import { tmfsInit } from '/src/tmfs/tmfs.js';
import { tmglInit, tmglClear , tmglSquare} from '/src/tmgl/tmgl.js';

function main() {

  tmiInit("#glCanvas");
  tmfsInit("#glCanvas");
  tmglInit("#glCanvas")

  window.requestAnimationFrame(loop);
}

function loop(timestamp) {
  tmiUpdate();
  tmglClear(Math.abs(Math.sin(timestamp / 10000.0)), 0.0, Math.abs(Math.cos(timestamp / 5000.0)));

  tmglSquare();

  window.requestAnimationFrame(loop);
}

window.onload = main;

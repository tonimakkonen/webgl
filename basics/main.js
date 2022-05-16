
"use strict";

import { tmiInit, tmiUpdate, tmiKeyDown, tmiKeyClicked, tmiKeyReleased, tmiGetMouse } from '/src/tmin/tmin.js';
import { tmfsInit } from '/src/tmfs/tmfs.js';
import { tmglInit, tmglClear , tmglSquare} from '/src/tmgl/tmgl.js';
import { tmglLoadTexture } from '/src/tmgl/textures/tmgltextures.js';
import { tmrLoadImage } from '/src/tmr/tmr.js';

function main() {

  tmiInit('#glCanvas');
  tmfsInit('#glCanvas');
  tmglInit('#glCanvas');

  tmglLoadTexture('res/tex.png');

  window.requestAnimationFrame(loop);
}

function loop(timestamp) {
  tmiUpdate();
  tmglClear(Math.abs(Math.sin(timestamp / 10000.0)), 0.0, Math.abs(Math.cos(timestamp / 5000.0)));

  tmglSquare(0.25, 0.25);

  window.requestAnimationFrame(loop);
}

window.onload = main;

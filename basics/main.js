
"use strict";

import { tmiInit, tmiUpdate, tmiKeyDown, tmiKeyClicked, tmiKeyReleased } from '/src/tmin/tminput.js';

tmiInit();

function loop(timestamp) {
  tmiUpdate();
  
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

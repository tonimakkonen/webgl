
"use strict";

// Simple lib used to ease fullscreen and mouse capture

function tmfsInit(element) {
  const canvas = document.querySelector(element);
  if (!canvas || canvas === null) throw 'Could not find element: ' + element;
  canvas.addEventListener('click', e => {
    // It's probably ok to request the fullscreen and pointer lock even though we have it
    canvas.requestPointerLock();
    canvas.requestFullscreen();
  });
}

export { tmfsInit };

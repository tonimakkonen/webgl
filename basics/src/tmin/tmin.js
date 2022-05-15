
"use strict";

// Simple input library designed to be used with game loops

const TMI_CLICKED  = 1;
const TMI_DOWN     = 2;
const TMI_RELEASED = 3;

const tmiKeysDown = new Set();
const tmiKeyState = new Map();

var tmiMouseDelta = { x: 0, y: 0 }
var tmiMouseState = { x: 0, y: 0, moveX: 0, moveY: 0 };

// Needs to be called to initialize keys
function tmiInit(element) {

  // Add key listeners
  document.addEventListener('keydown', (event) => { tmiKeysDown.add(event.code); }, false);
  document.addEventListener('keyup', (event) => { tmiKeysDown.delete(event.code); }, false);

  // Mouse listeners
  const canvas = document.querySelector(element);
  if (!canvas || canvas === null) throw 'Could not find element: ' + element;
  canvas.addEventListener('mousemove', e => {
    tmiMouseDelta.x += e.movementX
    tmiMouseDelta.y += e.movementY
  });
}

// Needs to be called once every game loop
function tmiUpdate() {

  // mouse
  tmiMouseState.moveX = tmiMouseDelta.x
  tmiMouseState.moveY = tmiMouseDelta.y
  tmiMouseDelta.x = 0.0
  tmiMouseDelta.y = 0.0

  // All keys that are not pressed now should be in TMI_RELEASED state or not present at all
  const toRelease = new Set();
  const toDelete = new Set();
  tmiKeyState.forEach((value, key) => {
    if (!tmiKeysDown.has(key)) {
      if (value === TMI_RELEASED) toDelete.add(key);
      else toRelease.add(key);
    }
  });
  toRelease.forEach((key) => { tmiKeyState.set(key, TMI_RELEASED); });
  toDelete.forEach((key) => { tmiKeyState.delete(key); });

  // All keys that are down now should either be in TMI_CLICKED ro TMI_DOWN state
  tmiKeysDown.forEach((value) => {
    const existing = tmiKeyState.get(value);
    if (existing) {
      if (existing == TMI_RELEASED) tmiKeyState.set(value, TMI_CLICKED);
      if (existing == TMI_CLICKED) tmiKeyState.set(value, TMI_DOWN);
      // Down value just stays down
    } else tmiKeyState.set(value, TMI_CLICKED);
  });
}

function tmiKeyDown(code) {
  const val = tmiKeyState.get(code);
  if (val === TMI_CLICKED || val === TMI_DOWN) return true;
  return false;
}

function tmiKeyUp(code) {
  const val = tmiKeyState.get(code);
  return val === undefined || val === TMI_RELEASED;
  return false;
}

function tmiKeyClicked(code) {
  return tmiKeyState.get(code) === TMI_CLICKED;
}

function tmiKeyReleased(code) {
  return tmiKeyState.get(code) === TMI_RELEASED;
}

function tmiGetMouse() {
  return tmiMouseState;
}


export { tmiInit, tmiUpdate, tmiKeyDown, tmiKeyUp, tmiKeyClicked, tmiKeyReleased, tmiMouseState, tmiGetMouse };

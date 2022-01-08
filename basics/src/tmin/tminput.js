
"use strict";

const TMI_CLICKED  = 1;
const TMI_DOWN     = 2;
const TMI_RELEASED = 3;

const tmi_keys_down = new Set();
const tmi_key_state = new Map();

// Needs to be called to initialize keys
function tmiInit() {
  document.addEventListener('keydown', (event) => { tmi_keys_down.add(event.code); }, false);
  document.addEventListener('keyup', (event) => { tmi_keys_down.delete(event.code); }, false);
}

// Needs to be called once every game loop
function tmiUpdate() {

  // All keys that are down now should either be in TMI_CLICKED ro TMI_DOWN state
  tmi_keys_down.forEach((value) => {
    const existing = tmi_key_state.get(value);
    if (existing) {
      if (existing == TMI_RELEASED) tmi_key_state.set(value, TMI_CLICKED);
      if (existing == TMI_CLICKED) tmi_key_state.set(value, TMI_DOWN);
      // Down value just stays down
    } else tmi_key_state.set(value, TMI_CLICKED);
  });

  // All keys that are not pressed now should be in TMI_RELEASED state or not present at all
  const to_release = new Set();
  const to_delete = new Set();
  tmi_key_state.forEach((value, key) => {
    if (!tmi_keys_down.has(key)) {
      if (value === TMI_RELEASED) to_delete.add(key);
      else to_release.add(key);
    }
  });
  to_release.forEach((key) => { tmi_key_state.set(key, TMI_RELEASED); });
  to_delete.forEach((key) => { tmi_key_state.delete(key); });
}

function tmiKeyDown(code) {
  const val = tmi_key_state.get(code);
  if (val === TMI_CLICKED || val === TMI_DOWN) return true;
  return false;
}

function tmiKeyUp(code) {
  const val = tmi_key_state.get(code);
  return val === undefined || val === TMI_RELEASED;
  return false;
}

function tmiKeyClicked(code) {
  return tmi_key_state.get(code) === TMI_CLICKED;
}

function tmiKeyReleased(code) {
  return tmi_key_state.get(code) === TMI_RELEASED;
}


export { tmiInit, tmiUpdate, tmiKeyDown, tmiKeyUp, tmiKeyClicked, tmiKeyReleased };

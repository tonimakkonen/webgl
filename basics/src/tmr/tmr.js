
"use strict";

// Resource loading utilities

var tmrResourceStatus = {
  resourcesSpecified: 0,
  resourcesDone: 0
}

function tmrGetResourcesDone() {
  if (tmrResourceStatus.resourcesSpecified == 0) return 1.0;
  return tmrResourceStatus.resourcesDone / tmr.resourcesSpecified;
}

function tmrLoadImage(url, action) {
  tmrResourceStatus.resourcesSpecified += 1;
  const image = new Image();
  image.onload = function() {
    console.log('finished loading image ' + url);
    action(image);
    tmrResourceStatus.resourcesDone += 1;
  };
  image.src = url;
}

function tmrLoadSound(url, action) {
  throw 'Not implemented';
}

export { tmrGetResourcesDone, tmrLoadImage }

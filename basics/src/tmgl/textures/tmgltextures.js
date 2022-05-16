
"use strict";

import { tmrLoadImage } from '/src/tmr/tmr.js';
import { tmglGl } from '../tmgl.js';

function tmglLoadTexture(url) {

  var gl = tmglGl;

  const texture = gl.createTexture();
  // TODO: Not here?
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

  tmrLoadImage(url, (image) => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
    gl.generateMipmap(gl.TEXTURE_2D);
  });
}

export { tmglLoadTexture }

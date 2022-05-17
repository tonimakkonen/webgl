
"use strict";

import { tmglLoadShader, tmglInitShader, tmglVertexIdentity, tmglFragmentDummy } from './programs/tmglshaders.js';
import { tmglGeometry, tmglInitGeometry } from './geometry/tmglgeometry.js';

var tmglGl = null;
var tmglProgram = null;

///////////////////
// INIT FUNCTION //
///////////////////

function tmglInit(element) {

  // Select canvas
  const canvas = document.querySelector(element);
  tmglGl = canvas.getContext("webgl");
  if (tmglGl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // TODO: Move to shader part of the code
  // Load basic shaders
  const shaderProgram = tmglInitShader(tmglGl, tmglVertexIdentity, tmglFragmentDummy);
  tmglProgram = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: tmglGl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: tmglGl.getAttribLocation(shaderProgram, 'aTextureCoord')
    },
    uniformLocations: {
      posx: tmglGl.getUniformLocation(shaderProgram, 'uPosX'),
      posy: tmglGl.getUniformLocation(shaderProgram, 'uPosY'),
      uSampler: tmglGl.getUniformLocation(shaderProgram, 'uSampler')
    },
  };
  console.log(tmglProgram);

  tmglInitGeometry(tmglGl);

}

// Functions //

function tmglClear(red, green, blue) {
  tmglGl.clearColor(red, green, blue, 1.0);
  tmglGl.clear(tmglGl.COLOR_BUFFER_BIT);
}

// Draw a square
function tmglSquare(posx, posy) {

  tmglGl.useProgram(tmglProgram.program);

  tmglGl.uniform1f(tmglProgram.uniformLocations.posx, posx);
  tmglGl.uniform1f(tmglProgram.uniformLocations.posy, posy);

  tmglGl.bindBuffer(tmglGl.ARRAY_BUFFER, tmglGeometry.square.pos);
  tmglGl.vertexAttribPointer(tmglProgram.attribLocations.vertexPosition, 2, tmglGl.FLOAT, false, 0, 0);
  tmglGl.enableVertexAttribArray(tmglProgram.attribLocations.vertexPosition);

  tmglGl.bindBuffer(tmglGl.ARRAY_BUFFER, tmglGeometry.square.tc);
  tmglGl.vertexAttribPointer(tmglProgram.attribLocations.textureCoord, 2, tmglGl.FLOAT, false, 0, 0);
  tmglGl.enableVertexAttribArray(tmglProgram.attribLocations.textureCoord);


  // Tell WebGL we want to affect texture unit 0
  tmglGl.activeTexture(tmglGl.TEXTURE0);

  // TODO: Bind the right texture
  //gl.bindTexture(gl.TEXTURE_2D, texture);

  tmglGl.uniform1i(tmglProgram.uniformLocations.uSampler, 0);

  tmglGl.drawArrays(tmglGl.TRIANGLE_STRIP, 0, 4);
}

//

export { tmglGl, tmglInit, tmglClear, tmglSquare };

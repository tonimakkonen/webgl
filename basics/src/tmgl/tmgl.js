
"use strict";

import { tmglLoadShader, tmglInitShader, tmglVertexIdentity, tmglFragmentDummy } from './shaders/tmglshaders.js';

var tmglGl = null;
var tmglGeometry = null;
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

  // Load basic shaders
  const shaderProgram = tmglInitShader(tmglGl, tmglVertexIdentity, tmglFragmentDummy);
  tmglProgram = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: tmglGl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      posx: tmglGl.getUniformLocation(shaderProgram, 'uPosX'),
      posy: tmglGl.getUniformLocation(shaderProgram, 'uPosY')
    },
  };

  // Load basic geometry objects
  tmglGeometry = tmglInitBuffers(tmglGl);

  // Init shit
  tmglGl.useProgram(tmglProgram.program);
  tmglGl.bindBuffer(tmglGl.ARRAY_BUFFER, tmglGeometry.position);
  tmglGl.vertexAttribPointer(tmglProgram.attribLocations.vertexPosition, 2, tmglGl.FLOAT, false, 0, 0);
  tmglGl.enableVertexAttribArray(tmglProgram.attribLocations.vertexPosition);
}

// //

function tmglInitBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [0.5,  0.5, -0.5,  0.5, 0.5, -0.5, -0.5, -0.5];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return {
    position: positionBuffer,
  };
}

// Functions //

function tmglClear(red, green, blue) {
  tmglGl.clearColor(red, green, blue, 1.0);
  tmglGl.clear(tmglGl.COLOR_BUFFER_BIT);
}

// Draw a square
function tmglSquare(posx, posy) {
  tmglGl.uniform1f(tmglProgram.uniformLocations.posx, posx);
  tmglGl.uniform1f(tmglProgram.uniformLocations.posy, posy);

  // The program is already defined
  tmglGl.drawArrays(tmglGl.TRIANGLE_STRIP, 0, 4);
}

//

export { tmglGl, tmglInit, tmglClear, tmglSquare };

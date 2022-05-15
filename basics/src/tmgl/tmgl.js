
"use strict";

import { tmglVertexIdentity, tmglFragmentDummy } from './shaders/tmglshaders.js';

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
    },
  };

  // Load basic geometry objects
  tmglGeometry = tmglInitBuffers(tmglGl);

}

/////////////
// SHADERS //
/////////////

function tmglLoadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(shader);
  return shader;
}

function tmglInitShader(gl, vsSource, fsSource) {
  const vertexShader = tmglLoadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = tmglLoadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const shaderProgram = tmglGl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) throw gl.getProgramInfoLog(shaderProgram);
  return shaderProgram;
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

function tmglSquare() {



  // TODO: Should not be on every draw call!!
  {
    const numComponents = 2;
    const type = tmglGl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    tmglGl.bindBuffer(tmglGl.ARRAY_BUFFER, tmglGeometry.position);

    tmglGl.vertexAttribPointer(
        tmglProgram.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    tmglGl.enableVertexAttribArray(tmglProgram.attribLocations.vertexPosition);
  }

  // Draw a square with 2 triamgles

  tmglGl.useProgram(tmglProgram.program);

  tmglGl.drawArrays(tmglGl.TRIANGLE_STRIP, 0, 4);
}

//

export { tmglInit, tmglClear, tmglSquare };

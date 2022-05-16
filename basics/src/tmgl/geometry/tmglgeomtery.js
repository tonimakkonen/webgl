
"use strict";

// We define some common geometry shapes such as e.g. squares (and tex coords)

var tmglGeometry = null;

function tmglInitGeometry(gl) {
  // square
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [0.5,  0.5, -0.5,  0.5, 0.5, -0.5, -0.5, -0.5];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

}

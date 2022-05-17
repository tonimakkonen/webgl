
"use strict";

// We define some common geometry shapes such as e.g. squares (and tex coords)

var tmglGeometry = null;

function tmglInitGeometry(gl) {
  tmglGeometry = createGeometryObjects(gl);
}

function createGeometryObjects(gl) {
  return {
    square: createSquare(gl)
  };
}

function createSquare(gl) {

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  const texCoords = [0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

  return { pos: positionBuffer, tc: texCoordBuffer, type: gl.TRIANGLE_STRIP, count: 4 }
}

function createCircle(gl, triangles) {
  // TODO
}

export { tmglGeometry, tmglInitGeometry }

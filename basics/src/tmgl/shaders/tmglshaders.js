
"use strict";

const tmglVertexIdentity = `
    attribute vec4 aVertexPosition;
    uniform float uPosX, uPosY;
    void main() {
      gl_Position = vec4(aVertexPosition[0] + uPosX, aVertexPosition[1] + uPosY, 0.0, 1.0);
    }
  `;

const tmglFragmentDummy = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`;

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
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) throw gl.getProgramInfoLog(shaderProgram);
  return shaderProgram;
}

export { tmglLoadShader, tmglInitShader, tmglVertexIdentity, tmglFragmentDummy }

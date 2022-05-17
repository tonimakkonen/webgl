
"use strict";

const tmglVertexIdentity = `

    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;

    varying highp vec2 vTextureCoord;

    uniform float uPosX, uPosY;

    void main() {
      gl_Position = vec4(aVertexPosition[0] + uPosX, aVertexPosition[1] + uPosY, 0.0, 1.0);
      vTextureCoord = aTextureCoord;
    }
  `;

const tmglFragmentDummy = `

  varying highp vec2 vTextureCoord;

  uniform sampler2D uSampler;

  void main() {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
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


"use strict";

const tmglVertexIdentity = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

const tmglFragmentDummy = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`;

export { tmglVertexIdentity, tmglFragmentDummy }

precision highp float;
precision highp int;

uniform sampler2D texture;
varying vec2 coord;


void main() {
  vec4 color = texture2D(texture, coord);

  gl_FragColor = vec4(color.x, 0, 0, 1.0);
}

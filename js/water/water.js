import '../init/init.js'
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { scene } from '../init/init.js';
export function initWater() {
  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
  let water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('./waternormals.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.scene.fog !== undefined
    }
  );
  water.rotation.x = - Math.PI / 2;

  scene.scene.add(water);
  return water;
}

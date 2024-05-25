import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import WaterSimulation from '../WaterSimulation'; // Import the WaterSimulation class

function calculateModelSize(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);
  return Math.max(size.x, size.y, size.z);
}

const delta = new THREE.Clock();
// Set up the scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 2000);
camera.position.z = 10;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 5000, 20);
pointLight.position.set(10, 10, 10); // Set the position of the light
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.autoRotate = false;
controls.autoRotateSpeed = 5;

// Instantiate WaterSimulation
const waterSimulation = new WaterSimulation();

// Declare the loader
const loader = new GLTFLoader();

let boat;

// Load the boat
loader.load('../assets/boats/speed_boat_05/scene.gltf', function (gltf) {
  boat = gltf.scene;
  boat.position.set(0, 0.3, 0);
  scene.add(boat);
  console.log('Boat model loaded');
}, function (xhr) {
  console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
}, function (error) {
  console.error('An error happened', error);
});

// Create water surface
const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
let water = new Water(
  waterGeometry,
  {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load('assets/waters/waternormals.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  }
);

water.rotation.x = -Math.PI / 2;
scene.add(water);

// Animate function
const animate = () => {
  controls.update();
  requestAnimationFrame(animate);

  if (boat) {
    const boatPosition = boat.position;
    waterSimulation.addDrop(renderer, boatPosition.x, boatPosition.z, 0.1, 1.0);
    waterSimulation.stepSimulation(renderer);
    waterSimulation.updateNormals(renderer);

    // Sync the water texture
    water.material.uniforms['normalSampler'].value = waterSimulation.texture.texture;
  }

  water.material.uniforms['time'].value += 1.0 / 60.0;

  renderer.render(scene, camera);
};

animate();
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
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

//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setClearColorHex(0xffffff, 1);
//renderer.setClearColor(0xffffff)
document.body.appendChild(renderer.domElement);


//camera
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

//declare the loader
const loader = new GLTFLoader();

//load the boat
loader.load('../assets/boats/speed_boat_05/scene.gltf',
  function (gltf) {
    gltf.scene.position.set(0, 0.3, 0);
    scene.add(gltf.scene);
    console.log('in gltf');
    //renderer.render(scene, camera)
  },
  function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '%loaded'); },
  function (error) { console.error('An error happened', error); });

let model;
let animations;
let mixer;
const clones = [];
//load the water    
// loader.load(
//   '../assets/waters/water_waves/scene.gltf',
//   function (gltf){
//       model = gltf.scene;
//       animations = gltf.animations;
//       mixer = new THREE.AnimationMixer(gltf.scene);

//       gltf.scene.scale.set(0.001, 0.001, 0.001);
//       gltf.scene.position.y = -0.4;

//       const numClones = 10;
//       const spacing = 1;

//       for (let i = 0; i < numClones; i++) {
//         const clone = model.clone();
//         const cloneMixer = new THREE.AnimationMixer(clone);

//         for (let j = 0; j < animations.length; j++) {
//           const action = mixer.clipAction(animations[j]);
//           const cloneAction = cloneMixer.clipAction(animations[j].clone());
//           cloneAction.play();
//         }

//         clone.position.x = (i + 1) * spacing;

//         scene.add(clone);

//         // clone.position.x = (i - 1) * spacing;

//         // scene.add(clone);

//         clones.push({
//           model: clone,
//           mixer: cloneMixer
//         });
//       }

//       // animations.forEach(function (animation) {
//       //   mixer.clipAction(animation).play();
//       // });
//       //scene.add(gltf.scene);

//       console.log('in gltf');
//       //renderer.render(scene, camera)

//       renderer.render(scene, camera)
//   },
//   function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '%loaded'); },
//   function (error) { console.error('An error happened', error); }
// );
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

water.rotation.x = - Math.PI / 2;

scene.add(water);
//renderer.render(scene, camera);
const animate = () => {
  controls.update();
  requestAnimationFrame(animate);
  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  //const delta = clock.getDelta();
  // if(mixer){
  //   mixer.update(0.01);
  // }
  // if (mixer) {
  //   mixer.update(0.01);
  // }

  // for (const { mixer } of clones) {
  //   mixer.update(0.01);
  // }
  renderer.render(scene, camera);
};
animate();
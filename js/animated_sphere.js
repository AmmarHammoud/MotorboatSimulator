//
import * as THREE from 'three';
import '../css/main.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//Scene
const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

//
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;



//
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
document.body.appendChild(renderer.domElement);

//create sphere
const geomtry = new THREE.SphereGeometry(1, 30, 30);

//
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});

const mesh = new THREE.Mesh(geomtry, material);
//mesh.position.x = -2;

//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 2, 2);

//add to the scen
scene.add(light);
scene.add(mesh);
//scene.add(standardMesh);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = false;
controls.autoRotateSpeed = 5;

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //camera
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    //renderer
    renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};
loop();
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from '../scene/scene.js';
import { Renderer } from '../render/render.js';
import { Camera } from '../camera/camera.js';
import { initWater } from '../water/water.js';
import { Boat } from '../boat/boat.js';
import { animate } from '../animate/animate.js';
import { initOrbitControls } from '../controls/controls.js';

export let loader;
export let scene;
export let renderer;
export let camera;
export let water;
export let boat;
export let controls;
export function init() {
    //the loader for loading models
    loader = new GLTFLoader();

    //init the scene
    scene = new Scene();

    //Renderer
    renderer = new Renderer();
    renderer.init();

    //set up the camera
    camera = new Camera();
    camera.init();

    //init the water
    water = initWater();

    //init the boat
    boat = new Boat();

    //init orbit controls
    initOrbitControls();

    //init the animation function
    //animate();
}
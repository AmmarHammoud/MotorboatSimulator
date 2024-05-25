import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { controls, camera, renderer } from '../init/init.js';
export function initOrbitControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 5;
}

import * as THREE from 'three';
import { sizes } from '../constants/constants.js';
export class Camera{
    constructor(){
        this.camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 2000);
    }
    init(){
        this.camera.position.z = 10;
    }
}
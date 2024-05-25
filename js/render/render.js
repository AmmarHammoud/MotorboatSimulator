import * as THREE from 'three';
import '../constants/constants.js'

export class Renderer{
    constructor(){
        this.renderer = new THREE.WebGLRenderer();
    }
    init(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }
}
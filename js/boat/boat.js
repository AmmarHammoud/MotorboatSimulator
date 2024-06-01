import { loader, scene, renderer, camera } from "../init/init.js";
export class Boat {
    constructor(){
        loader.load('../assets/boats/speed_boat_05/scene.gltf',
        function (gltf) {
          gltf.scene.position.set(0, 0.3, 0);
          scene.scene.add(gltf.scene);
          console.log('in gltf');
          renderer.renderer.render(scene.scene, camera.camera)
        },
        function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '%loaded'); },
        function (error) { console.error('An error happened', error); });
    }
  
    stop(){
      this.speed.vel = 0
      this.speed.rot = 0
    }
  
    update(){
      if(this.boat){
        this.boat.rotation.y += this.speed.rot
        this.boat.translateX(this.speed.vel)
      }
    }
  }
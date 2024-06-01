import { water, renderer, controls } from "../init/init";
let x = 1;
export const animate = () => {
  // requestAnimationFrame(animate);
  //controls.update();
  water.material.uniforms['time'].value += 1.0 / 60.0;
  // console.log(renderer)
  // renderer.render(scene.scene, camera.camera);
  
  
  console.log(x++);
};
animate();
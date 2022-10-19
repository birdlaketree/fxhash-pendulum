import { PlaneGeometry, Mesh, MathUtils } from 'three';
import { canvasNoiseFloor } from '../materials/canvasNoiseFloor';

const walls = (scene, size = 20, isDay) => {
  const materialFloor = isDay ? canvasNoiseFloor(0.16, isDay) : canvasNoiseFloor(0.01, isDay);
  const geometry = new PlaneGeometry(size, size, 4, 4);

  const floor = new Mesh( geometry, materialFloor );
  floor.receiveShadow = true;
  floor.rotation.x = MathUtils.degToRad(270);
  scene.add(floor);
}

export { walls };
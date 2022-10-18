import { PlaneGeometry, Mesh, MathUtils } from 'three';
import { solidLight } from '../materials/solidLight';
import { canvasNoiseWall } from '../materials/canvasNoiseWall';
import { canvasNoiseFloor } from '../materials/canvasNoiseFloor';

const walls = (scene, size = 20, isDay) => {
  const materialWall = canvasNoiseWall(0.9);
  const materialFloor = isDay ? canvasNoiseFloor(0.16, isDay) : canvasNoiseFloor(0.01, isDay);
  const materialCeeling = solidLight(0xffffff, 0xffffff);
  const geometry = new PlaneGeometry(size, size, 4, 4);

  const floor = new Mesh( geometry, materialFloor );
  floor.receiveShadow = true;
  floor.rotation.x = MathUtils.degToRad(270);
  // floor.rotation.x = 270 * (Math.PI/180);
  scene.add(floor);

  // const ceeling = new Mesh( geometry, materialCeeling );
  // ceeling.receiveShadow = true;
  // ceeling.rotation.x = Math.degToRad(90);
  // ceeling.position.y = size;
  // scene.add(ceeling);

  // const wallLeft = new Mesh( geometry, materialWall );
  // wallLeft.receiveShadow = true;
  // wallLeft.rotation.y = Math.degToRad(90);
  // wallLeft.position.x = -size/2;
  // wallLeft.position.y = size/2;
  // scene.add(wallLeft);

  // const wallRight = new Mesh( geometry, materialWall );
  // wallRight.receiveShadow = true;
  // wallRight.rotation.y = Math.degToRad(270);
  // wallRight.position.x = size/2;
  // wallRight.position.y = size/2;
  // scene.add(wallRight);

  // const wallFront = new Mesh( geometry, materialWall );
  // wallFront.receiveShadow = true;
  // wallFront.rotation.y = Math.degToRad(180);
  // wallFront.position.x = 0;
  // wallFront.position.y = size/2;
  // wallFront.position.z = size/2;
  // scene.add(wallFront);

  // const wallBack = new Mesh( geometry, materialWall );
  // wallBack.receiveShadow = true;
  // wallBack.position.x = 0;
  // wallBack.position.y = size/2;
  // wallBack.position.z = -size/2;
  // scene.add(wallBack);
}

export { walls };
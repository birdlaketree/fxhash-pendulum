import { PerspectiveCamera, Group, Vector3 } from 'three';
import { GUI } from 'dat.gui';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 200 );
  camera.position.x = 6;
  camera.position.z = 9;
  camera.position.y = 6;

  const gui = new GUI();
  const cubeFolder = gui.addFolder('Cube');
  cubeFolder.add(camera.position, 'x', 0, 16);
  cubeFolder.add(camera.position, 'y', 0, 16);
  cubeFolder.add(camera.position, 'z', 0, 16);
  cubeFolder.open();

  return camera;
}

const createDolly = (camera, scene) => {
  const dolly = new Group();
  dolly.name = "dolly";
  scene.add(dolly);
  dolly.add(camera);
  return dolly;
}

export { createCamera, createDolly };
import { PerspectiveCamera, Group, Vector3 } from 'three';
import { MathUtils } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 300 );

  const radius  = Math.random()*12+12;
  const polar   = MathUtils.degToRad(Math.random()*45+30);
  const equator = MathUtils.degToRad(Math.random()*60+15);

  const cameraVector = new Vector3();
  cameraVector.setFromSphericalCoords(radius, polar, equator);

  camera.position.x = cameraVector.x;
  camera.position.y = cameraVector.y;
  camera.position.z = cameraVector.z;

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
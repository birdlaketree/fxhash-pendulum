import { PlaneGeometry, SphereGeometry, Mesh, MeshStandardMaterial, MathUtils, DoubleSide } from 'three';
import { rndNoiseFloor } from '../canvasMaps/RndNoiseFloor';

const walls = (scene, size = 20, bgHSL, color) => {
  const materialFloor = rndNoiseFloor(bgHSL, color);
  const materialDome = new MeshStandardMaterial({
    color: color,
    envMapIntensity: 100,
    side: DoubleSide
  });

  const geometryPlane = new PlaneGeometry(size, size, 4, 4);
  const floor = new Mesh(geometryPlane, materialFloor);
  floor.receiveShadow = true;
  floor.rotation.x = MathUtils.degToRad(270);
  scene.add(floor);

  const geometryDome = new SphereGeometry(200, 64, 64);
  const dome = new Mesh(geometryDome, materialDome);
  scene.add(dome);
}

export { walls };
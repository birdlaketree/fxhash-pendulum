import { PlaneGeometry, MathUtils, Mesh, Color } from 'three';
import { RndDotsMaps } from "../components/canvasMaps/RndDotsMaps";
import { RndDotsNormal } from '../components/canvasMaps/RndDotsNormal';
import { GridDotsMaps } from '../components/canvasMaps/GridDotsMaps';
import { RndNoiseNormal } from '../components/canvasMaps/RndNoiseNormal';
import { canvasTextureMaterial } from "../components/materials/canvasTextureMaterial";
import { GUI } from 'dat.gui';

export const materialTester = scene => {

  // let maps = new RndDotsMaps(new Color(0x0000ff));
  let maps = new GridDotsMaps(new Color(0x0000ff));
  let normalMap = new RndNoiseNormal();
  // let normalMap = new RndDotsNormal();
  const material = canvasTextureMaterial({...normalMap, ...maps}, 1);

  const planeGeom = new PlaneGeometry(2, 2, 4, 4);
  const plane = new Mesh(planeGeom, material);
  plane.rotation.x = 5.9;
  plane.rotation.y = 0.2;
  plane.rotation.z = 2;
  plane.position.x = 3;
  plane.position.y = 3;
  plane.position.z = 4.1;
  scene.add(plane);

  const gui = new GUI();
  const cubeFolder = gui.addFolder('Material Plane');
  cubeFolder.add(plane.rotation, 'x', 0, MathUtils.degToRad(360));
  cubeFolder.add(plane.rotation, 'y', 0, MathUtils.degToRad(360));
  cubeFolder.add(plane.rotation, 'z', 0, MathUtils.degToRad(360));
  cubeFolder.add(plane.position, 'x', -6, 8);
  cubeFolder.add(plane.position, 'y', -6, 8);
  cubeFolder.add(plane.position, 'z', -6, 8);
  cubeFolder.open();

  return plane;
}
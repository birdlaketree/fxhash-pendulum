import { Scene, Fog, PMREMGenerator } from 'three';
import { RoomEnvironment } from './RoomEnv';
import { hslToHex } from '../../utils/colorUtils';

const createScene = (renderer, isDay) => {
  const scene = new Scene();

  const backgroundColor = isDay ? hslToHex(0, 0, .78) : hslToHex(0, 0, 0.04);
  scene.background = backgroundColor;
  
  const fog = new Fog( backgroundColor, 0, 200 );
  scene.fog = fog;
  
  const pmremGenerator = new PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.001 ).texture;

  return scene;
}

export { createScene };
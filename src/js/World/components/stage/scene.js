import { Scene, Fog, PMREMGenerator } from 'three';
import { RoomEnvironment } from './RoomEnv';
import { createColor } from '../../utils/createColor';

const createScene = renderer => {
  const scene = new Scene();

  const backgroundColor = createColor(0, 0, 0.1);
  scene.background = backgroundColor;
  
  const fog = new Fog( backgroundColor, 0, 200 );
  scene.fog = fog;
  
  const pmremGenerator = new PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.001 ).texture;

  return scene;
}

export { createScene };
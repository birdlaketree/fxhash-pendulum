import { 
  AmbientLight,
  SpotLight,
  LinearFilter,
  sRGBEncoding
} from 'three';
import { textureHandler } from '../../system/textureHandler';

const shadowMapUrl = new URL('/assets/public/textures/noise/perlin_6.png', import.meta.url);

const createLights = scene => {
  const texture = textureHandler(shadowMapUrl, 1);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.encoding = sRGBEncoding;

  // mobile phone optimisation
  // setting lower mapSize makes it much faster on iPhone 12 Pro Max
  // const spot = new SpotLight(0xffffff, 840);
  const spot = new SpotLight(0xffffff, 1200);
  spot.penumbra = 1;
  spot.decay = 2;
  spot.angle = Math.PI/4;
  spot.position.set(0, 20, 0);
  spot.target.position.set(0, 0, 0);
  spot.castShadow = true;
  spot.map = texture;
  spot.shadow.focus = 1;
  spot.shadow.mapSize.width = 4096;
  spot.shadow.mapSize.height = 4096;
  scene.add(spot);

  const light = new AmbientLight(0x404040, 3.4); // soft white light
  scene.add(light);
}

export { createLights };
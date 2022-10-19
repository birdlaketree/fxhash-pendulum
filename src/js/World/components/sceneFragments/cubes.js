import { cube } from "../bodies/cube";
import { defaultColorShinyPlastic } from "../materials/defaultColorShinyPlastic";
import { hslToHex } from "../../utils/colorUtils";

const cubes = (
  scene,
  loop,
  physicsWorld,
  isDay,
  props
) => {
  const color = isDay ? hslToHex(0.6, 0, 0.8) : hslToHex(0.6, 0, 0.002);
  const blackMaterial = defaultColorShinyPlastic(color);
  const spreadWidth = 10;
  const {
    min,
    sizeRange,
    n = 12,
    y = 3,
    yRange = 6
  } = props;

  for (let i = 0; i < n; i++) {
    const size = {
      width:  Math.random() * sizeRange + min,
      height: Math.random() * sizeRange + min,
      depth:  Math.random() * sizeRange + min
    }
    const translation = {
      x: Math.random() * spreadWidth - spreadWidth/2,
      y: Math.random() * yRange + y,
      z: Math.random() * spreadWidth - spreadWidth/2
    }
    const rotation = {
      x: Math.random(),
      y: Math.random(),
      z: Math.random()
    }
    const cubeItem = cube(blackMaterial, size, translation, rotation, physicsWorld);
    scene.add(cubeItem.mesh);
    loop.bodies.push(cubeItem);
  }
}

export { cubes };
import { cube } from "../bodies/cube";
import { defaultColorShinyPlastic } from "../materials/defaultColorShinyPlastic";
import { hslToHex } from "../../utils/colorUtils";

const cubes = (
  scene,
  loop,
  physicsWorld,
  isDay
) => {
  const color = isDay ? hslToHex(0.6, 0, 0.8) : hslToHex(0.6, 0, 0.002);
  const blackMaterial = defaultColorShinyPlastic(color));
  const spreadWidth = 10;

  for (let i = 0; i < 12; i++) {
    const size = {
      width:  Math.random() * 0.2 + 0.05,
      height: Math.random() * 0.2 + 0.05,
      depth:  Math.random() * 0.2 + 0.05
    }
    const translation = {
      x: Math.random() * spreadWidth - spreadWidth/2,
      y: Math.random() * 6 + 3,
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
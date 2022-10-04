import { sphere } from "../bodies/sphere";
import { defaultColorShinyPlastic } from "../materials/defaultColorShinyPlastic";
import { createColor } from "../../utils/createColor";

const spheres = (
  scene,
  loop,
  physicsWorld
) => {
  const colorMaterial = defaultColorShinyPlastic(createColor(0.6, 0, 0.002));
  const spreadWidth = 10;

  for (let i = 0; i < 8; i++) {
    const size = {
      radius: Math.random()/12 + 0.02
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
    const sphereItem = sphere(colorMaterial, size, translation, rotation, physicsWorld);
    scene.add(sphereItem.mesh);
    loop.bodies.push(sphereItem);
  }
}

export { spheres };
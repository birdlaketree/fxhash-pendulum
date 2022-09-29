import { Color } from "three";

const createColor = (h, s, l) => {
  const color = new Color();
  color.setHSL(h, s, l);
  console.log(color);
  return color;
};

export { createColor };
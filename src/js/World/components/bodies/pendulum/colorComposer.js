import { createColor } from "../../../utils/createColor";

const colorComposer = (colorCompositionID) => {
  const envMapIntensity = 0.4;

  const black = {
    color: createColor(0, 1, 0),
    envMapIntensity: envMapIntensity - 0.2
  };
  const white = {
    color: createColor(0, 1, 1),
    envMapIntensity: envMapIntensity - 0.1
  };

  const whiteBlackColor = () => {
    const a = black;
    const b = {
      color: createColor(Math.random(), Math.random() * 0.3 + 0.7 , Math.random() * 0.8 + 0.04),
      envMapIntensity
    };
    const c = white;
    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }

  const hueSpreadAndOneBlack = () => {
    const hue = Math.random();
    const a = black;
    const b = {
      color: createColor(hue, Math.random() * 0.3 + 0.7 , 0.78),
      envMapIntensity
    };
    const c = {
      color: createColor(hue, Math.random() * 0.3 + 0.7 , 0.5),
      envMapIntensity
    };
    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }

  const hueSpreadAndOneWhite = () => {
    const hue = Math.random();
    const a = white;
    const b = {
      color: createColor(hue, Math.random() * 0.3 + 0.7 , 0.5),
      envMapIntensity
    };
    const c = {
      color: createColor(hue, Math.random() * 0.3 + 0.7 , 0.01),
      envMapIntensity
    };
    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }

  let colorConfig;
  console.log(colorCompositionID);
  if (colorCompositionID <= 0.33) {
    colorConfig = whiteBlackColor();
  }
  if (colorCompositionID >= 0.66) {
    colorConfig = hueSpreadAndOneBlack();
  }
  if (colorCompositionID > 0.33 && colorCompositionID < 0.66) {
    colorConfig = hueSpreadAndOneWhite();
  }

  return colorConfig;
}

export { colorComposer }
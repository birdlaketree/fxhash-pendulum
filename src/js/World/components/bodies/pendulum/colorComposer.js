import { hslToHex } from "../../../utils/colorUtils";
import { THEMES } from "@thi.ng/color-palettes";

const colorComposer = (colorCompositionID) => {
  const envMapIntensity = 0.4;

  const black = {
    color: hslToHex(0, 1, 0),
    envMapIntensity: envMapIntensity - 0.2
  };
  const white = {
    color: hslToHex(0, 1, 1),
    envMapIntensity: envMapIntensity - 0.1
  };

  const whiteBlackColor = () => {
    const a = black;
    const b = {
      color: hslToHex(Math.random(), Math.random() * 0.3 + 0.7 , Math.random() * 0.8 + 0.04),
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
      color: hslToHex(hue, Math.random() * 0.3 + 0.7 , 0.78),
      envMapIntensity
    };
    const c = {
      color: hslToHex(hue, Math.random() * 0.3 + 0.7 , 0.5),
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
      color: hslToHex(hue, Math.random() * 0.3 + 0.7 , 0.5),
      envMapIntensity
    };
    const c = {
      color: hslToHex(hue, Math.random() * 0.3 + 0.7 , 0.01),
      envMapIntensity
    };
    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }

  const toxiColorPalettes = () => {
    const selectedThemes = [
      '00qAPJU0vXnWXxf1k',
      '00QMEZl7ulP3f2WaX',
      '00uOqryM4SOXgd7S0',
      '00g3Jv9zydyJs2QlX'
    ]
    const themeIndex = Math.round(Math.random() * (selectedThemes.length - 1));
    // console.log('colorComposer.themeIndex', themeIndex);
    const theme = THEMES[selectedThemes[themeIndex]];

    const rangeB = Math.round(Math.random()*2) + 1;
    const rangeC = Math.round(Math.random()) + 4;
    const envI = 0.3;
    return {
      a: { color: theme[0],      envMapIntensity: envI},
      b: { color: theme[rangeB], envMapIntensity: envI},
      c: { color: theme[rangeC], envMapIntensity: envI}
    };
  }

  let colorConfig;
  // colorConfig = toxiColorPalettes();

  if (colorCompositionID <= 0.25) {
    colorConfig = whiteBlackColor();
    console.log('colorComposer.whiteBlackColor');
  }
  if (colorCompositionID > 0.25 && colorCompositionID <= 0.5) {
    colorConfig = hueSpreadAndOneWhite();
    console.log('colorComposer.hueSpreadAndOneWhite');
  }
  if (colorCompositionID > 0.5 && colorCompositionID <= 0.75) {
    colorConfig = hueSpreadAndOneBlack();
    console.log('colorComposer.hueSpreadAndOneBlack');
  }
  if (colorCompositionID > 0.75) {
    colorConfig = toxiColorPalettes();
    console.log('colorComposer.toxiColorPalettes');
  }

  return colorConfig;
}

export { colorComposer }
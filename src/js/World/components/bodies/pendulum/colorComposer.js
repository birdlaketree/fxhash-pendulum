import { hslToHex } from "../../../utils/colorUtils";
import { THEMES } from "@thi.ng/color-palettes";

const colorComposer = (colorCompositionID) => {
  const envMapIntensity = 0.4;

  const black = {
    color: hslToHex(0, 1, 0),
    envMapIntensity: envMapIntensity - 0.1
  };
  const white = {
    color: hslToHex(0, 1, 1),
    envMapIntensity: envMapIntensity - 0.1
  };

  const paleteGenerators = [];

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
  paleteGenerators.push(whiteBlackColor);

  const hueSpreadAndOneBlack = () => {
    const hue = Math.random();

    const a = black;
    const b = {
      color: hslToHex(hue, Math.random() * 0.4 + 0.6 , 0.8),
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
  paleteGenerators.push(hueSpreadAndOneBlack);

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
  paleteGenerators.push(hueSpreadAndOneWhite);

  const hueComplementaryAndOneWhite = () => {
    const hue = Math.random();
    const hueComplementary = hue + 0.7;

    const a = white;
    const b = {
      color: hslToHex(hue, Math.random() * 0.3 + 0.7 , 0.5),
      envMapIntensity
    };
    const c = {
      color: hslToHex(hueComplementary, Math.random() * 0.3 + 0.6 , 0.02),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }
  paleteGenerators.push(hueComplementaryAndOneWhite);


  const hueComplementaryAndOneBlack = () => {
    const hue = Math.random();
    const hueComplementary = hue + 0.6;

    const a = black;
    const b = {
      color: hslToHex(hue, Math.random() * 0.4 + 0.6 , 0.8),
      envMapIntensity
    };
    const c = {
      color: hslToHex(hueComplementary, Math.random() * 0.3 + 0.7 , 0.5),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }
  paleteGenerators.push(hueComplementaryAndOneBlack);

  // const toxiColorPalettes = () => {
  //   const selectedThemes = [
  //     '00qAPJU0vXnWXxf1k',
  //     '00QMEZl7ulP3f2WaX',
  //     '00uOqryM4SOXgd7S0',
  //     '00g3Jv9zydyJs2QlX'
  //   ]
  //   const themeIndex = Math.round(Math.random() * (selectedThemes.length - 1));
  //   // console.log('themeIndex', themeIndex);
  //   const theme = THEMES[selectedThemes[themeIndex]];

  //   const rangeB = Math.round(Math.random()*2) + 1;
  //   const rangeC = Math.round(Math.random()) + 4;
  //   const envI = 0.3;
  //   return {
  //     a: { color: theme[0],      envMapIntensity: envI},
  //     b: { color: theme[rangeB], envMapIntensity: envI},
  //     c: { color: theme[rangeC], envMapIntensity: envI}
  //   };
  // }
  // paleteGenerators.push(toxiColorPalettes);

  // let colorConfig = hueSpreadAndOneBlack();
  const pgIndex = Math.round((paleteGenerators.length - 1) * colorCompositionID);
  let colorConfig = paleteGenerators[pgIndex]();
  console.log('palette:', paleteGenerators[pgIndex].name);

  return colorConfig;
}

export { colorComposer }
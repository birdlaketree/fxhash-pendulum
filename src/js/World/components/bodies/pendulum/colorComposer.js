import { hslToHex } from "../../../utils/colorUtils";

const colorComposer = (colorCompositionID) => {
  const envMapIntensity = 0.4;

  // primitives

  const black = {
    color: hslToHex(0, 1, 0),
    envMapIntensity: envMapIntensity - 0.1
  };
  const white = {
    color: hslToHex(0, 1, 1),
    envMapIntensity: envMapIntensity - 0.1
  };

  const paleteGenerators = [];

  // palette tools

  const brightSaturation = () => Math.random() * 0.1 + 0.9;
  const strongSaturation = () => Math.random() * 0.2 + 0.8;
  const darkSaturation   = () => Math.random() * 0.4 + 0.2;

  const brightLightness = () => Math.random() * 0.2 + 0.6;
  const strongLightness = () => Math.random() * 0.2 + 0.3;
  const darkLightness   = () => Math.random() * 0.1 + 0.004;

  const brightTheme = [brightSaturation(), brightLightness()];
  const strongTheme = [strongSaturation(), strongLightness()];
  const darkTheme   = [darkSaturation(), darkLightness()];

  const themes = [
    brightTheme,
    strongTheme,
    darkTheme
  ]

  const getHueVariants = hue => {
    // 0.166 is equivalent to 60 degrees in the hue spectrum
    return [
      hue + 0.166 / 2,
      hue + 0.166,
      hue + 0.166 * 1.2,
      // hue + 0.166*2, // almost complement -- maybe to much for this env
      // initHue + 0.166*3 // complement -- maybe to much for this env
    ]
  }

  const grayscaleBright = () => Math.random() * 0.1 + 0.92;
  const grayscaleStrong = () => Math.random() * 0.3 + 0.1;
  const grayscaleDark   = () => Math.random() * 0.02;

  const grayscaleThemes = [
    grayscaleBright(),
    grayscaleStrong(),
    grayscaleDark()
  ]

  // palettes

  const whiteBlackColor = () => {
    const themeSeed = Math.random();
    const themeIndex = Math.round((themes.length - 1) * themeSeed);
    const theme = themes[themeIndex];

    const a = black;
    const b = white;
    const c = {
      color: hslToHex(Math.random(), ...theme),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }
  paleteGenerators.push(whiteBlackColor);

  const duoAndLightness = () => {
    const themeSeed = Math.random();
    const themeIndex = Math.round((themes.length - 1) * themeSeed);
    const theme = themes[themeIndex];

    const themeASeed = Math.random();
    const themeAIndex = Math.round((themes.length - 1) * themeASeed);
    const themeA = themes[themeAIndex];

    const themeBSeed = Math.random();
    const themeBIndex = Math.round((themes.length - 1) * themeBSeed);
    const themeB = themes[themeBIndex];

    const initHue = Math.random();
    const secondHueVariants = getHueVariants(initHue);
    const secondHueSeed = Math.random();
    const secondHueIndex = Math.round((secondHueVariants.length - 1) * secondHueSeed);
    const secondHue = secondHueVariants[secondHueIndex];

    const a = Math.round(Math.random()) ? white : black;
    const b = {
      color: hslToHex(initHue, ...themeA),
      envMapIntensity
    };
    const c = {
      color: hslToHex(secondHue, ...themeB),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }
  paleteGenerators.push(duoAndLightness);

  const tripple = () => {
    const themeASeed = Math.random();
    const themeAIndex = Math.round((themes.length - 1) * themeASeed);
    const themeA = themes[themeAIndex];

    const themeBSeed = Math.random();
    const themeBIndex = Math.round((themes.length - 1) * themeBSeed);
    const themeB = themes[themeBIndex];

    const themeCSeed = Math.random();
    const themeCIndex = Math.round((themes.length - 2) * themeCSeed);
    const themeC = themes[themeCIndex];

    const initHue = Math.random();

    const secondHueVariants = getHueVariants(initHue);
    const secondHueSeed = Math.random();
    const secondHueIndex = Math.round((secondHueVariants.length - 1) * secondHueSeed);
    const secondHue = secondHueVariants[secondHueIndex];

    const thirdHueVariants = getHueVariants(secondHue);
    const thirdHueSeed = Math.random();
    const thirdHueIndex = Math.round((thirdHueVariants.length - 1) * thirdHueSeed);
    const thirdHue = thirdHueVariants[thirdHueIndex];

    const a = {
      color: hslToHex(initHue, ...themeA),
      envMapIntensity
    };
    const b = {
      color: hslToHex(secondHue, ...themeB),
      envMapIntensity
    };
    const c = {
      color: hslToHex(thirdHue, ...themeC),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }
  paleteGenerators.push(tripple);

  const grayscale = () => {
    const themeASeed = Math.random();
    const themeAIndex = Math.round((grayscaleThemes.length - 1) * themeASeed);
    const themeA = grayscaleThemes[themeAIndex];

    const themeBSeed = Math.random();
    const themeBIndex = Math.round((grayscaleThemes.length - 1) * themeBSeed);
    const themeB = grayscaleThemes[themeBIndex];

    const themeCSeed = Math.random();
    const themeCIndex = Math.round((grayscaleThemes.length - 1) * themeCSeed);
    const themeC = grayscaleThemes[themeCIndex];

    const a = {
      color: hslToHex(0, 0, themeA),
      envMapIntensity
    };
    const b = {
      color: hslToHex(0, 0, themeB),
      envMapIntensity
    };
    const c = {
      color: hslToHex(0, 0, themeC),
      envMapIntensity
    };

    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }
  paleteGenerators.push(grayscale);

  let colorConfig = tripple();
  // const pgIndex = Math.round((paleteGenerators.length - 1) * colorCompositionID);
  // let colorConfig = paleteGenerators[pgIndex]();
  // console.log('palette:', paleteGenerators[pgIndex].name);

  return colorConfig;
}

export { colorComposer }
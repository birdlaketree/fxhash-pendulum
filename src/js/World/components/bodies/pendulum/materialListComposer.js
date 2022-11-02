import { canvasTextureMaterial } from "../../materials/canvasTextureMaterial";
import { RndDotsMaps } from "../../canvasMaps/RndDotsMaps";
import { RndNoiseNormal } from "../../canvasMaps/RndNoiseNormal";
import { RndNoiseTresholdNormal } from "../../canvasMaps/RndNoiseTresholdNormal";

const materialListComposer = (
    materialCompositionID,
    handleComposition,
    envMap
  ) => {

  // DIFFUSE

  // let maps = new RndNoiseTresholdNormal(new Color(0x0000ff), 64);

  const themesDiffuse = [];

  const allDots = () => {
    const a = RndDotsMaps;
    const b = RndDotsMaps;
    const c = RndDotsMaps;

    return {
      a,
      b,
      c
    };
  }
  themesDiffuse.push(allDots);

  const allNoise = () => {
    const a = RndNoiseTresholdNormal;
    const b = RndNoiseTresholdNormal;
    const c = RndNoiseTresholdNormal;

    return {
      a,
      b,
      c
    };
  }
  themesDiffuse.push(allNoise);

  const themeIndex = Math.round((themesDiffuse.length - 1) * materialCompositionID);
  // const themeIndex = 0;

  let maps = themesDiffuse[themeIndex]();
  console.log('materials:', themesDiffuse[themeIndex].name);
  let mapsA = new maps.a(handleComposition.a.colorComposition.color, Math.random()*16, Math.random()*96);
  let mapsB = new maps.b(handleComposition.b.colorComposition.color, Math.random()*16, Math.random()*96);
  let mapsC = new maps.c(handleComposition.c.colorComposition.color, Math.random()*16, Math.random()*96);

  // NORMAL

  // const noiseLevels = [4, 8, 16]
  // const nai = Math.round(Math.random() * (noiseLevels.length - 1));
  // const nbi = Math.round(Math.random() * (noiseLevels.length - 1));
  // const nci = Math.round(Math.random() * (noiseLevels.length - 1));
  // console.log('noise:    ', noiseLevels[nai], noiseLevels[nbi], noiseLevels[nci]);
  // let normalMapA = new RndNoiseNormal(noiseLevels[nai]);
  // let normalMapB = new RndNoiseNormal(noiseLevels[nbi]);
  // let normalMapC = new RndNoiseNormal(noiseLevels[nci]);

  // ROUGHNESS & METALNESS

  const plastic = {
    roughness: 1,
    metalness: 0,
    n: 'plastic'
  }
  const roughMetal = {
    roughness: 1,
    metalness: 1,
    n: 'roughMetal'
  }
  const shinyPlastic = {
    roughness: 0.25,
    metalness: 0,
    n: 'shinyPlastic'
  }
  const shinyMetal = {
    roughness: 0.2,
    metalness: 0.6,
    n: 'shinyMetal'
  }

  const rmProprerties = [];
  rmProprerties.push(plastic);
  rmProprerties.push(roughMetal);
  rmProprerties.push(shinyPlastic);
  rmProprerties.push(shinyMetal);

  const rmTheme = () => {
    const ai = Math.round(Math.random() * (rmProprerties.length - 1));
    const bi = Math.round(Math.random() * (rmProprerties.length - 1));
    const ci = Math.round(Math.random() * (rmProprerties.length - 1));
    const a = rmProprerties[ai];
    const b = rmProprerties[bi];
    const c = rmProprerties[ci];

    console.log('r & m:    ', a.n, b.n, c.n);
    return {a, b, c};
  }

  const rm = rmTheme();

  handleComposition.a.material = canvasTextureMaterial(
    {...mapsA, envMap},
    rm.a,
    handleComposition.a.colorComposition.envMapIntensity
  );

  handleComposition.b.material = canvasTextureMaterial(
    {...mapsB, envMap},
    rm.b,
    handleComposition.b.colorComposition.envMapIntensity
  );

  handleComposition.c.material = canvasTextureMaterial(
    {...mapsC, envMap},
    rm.c,
    handleComposition.c.colorComposition.envMapIntensity
  );

  mapsA = null;
  mapsB = null;
  mapsC = null;
  maps = null;
  normalMapA = null;
  normalMapB = null;
  normalMapC = null;
}

export { materialListComposer };
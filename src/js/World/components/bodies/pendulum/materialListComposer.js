import { canvasTextureMaterial } from "../../materials/canvasTextureMaterial";
import { SolidColorMaps } from "../../canvasMaps/SolidColorMaps";
import { RndDotsMaps } from "../../canvasMaps/RndDotsMaps";
import { RndNoiseNormal } from "../../canvasMaps/RndNoiseNormal";

const materialListComposer = (materialCompositionID, handleComposition) => {

  // DIFFUSE

  const themesDiffuse = [];

  // const solidSolidDots = () => {
  //   const a = SolidColorMaps;
  //   const b = SolidColorMaps;
  //   const c = RndDotsMaps;

  //   const randomized = [a,b,c].sort(() => Math.random() - 0.5);
  //   return {
  //     a: randomized[0],
  //     b: randomized[1],
  //     c: randomized[2],
  //   };
  // }
  // themesDiffuse.push(solidSolidDots);

  // const allSolids = () => {
  //   const a = SolidColorMaps;
  //   const b = SolidColorMaps;
  //   const c = SolidColorMaps;

  //   return {
  //     a,
  //     b,
  //     c
  //   };
  // }
  // themesDiffuse.push(allSolids);

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

  const themeIndex = Math.round((themesDiffuse.length - 1) * materialCompositionID);
  // const themeIndex = 0;

  let maps = themesDiffuse[themeIndex]();
  console.log('materials:', themesDiffuse[themeIndex].name);
  let mapsA = new maps.a(handleComposition.a.colorComposition.color);
  let mapsB = new maps.b(handleComposition.b.colorComposition.color);
  let mapsC = new maps.c(handleComposition.c.colorComposition.color);

  // NORMAL

  const noiseLevels = [4, 8, 16]
  const nai = Math.round(Math.random() * (noiseLevels.length - 1));
  const nbi = Math.round(Math.random() * (noiseLevels.length - 1));
  const nci = Math.round(Math.random() * (noiseLevels.length - 1));
  console.log('noise levels: ', noiseLevels[nai], noiseLevels[nbi], noiseLevels[nci]);
  let normalMapA = new RndNoiseNormal(noiseLevels[nai]);
  let normalMapB = new RndNoiseNormal(noiseLevels[nbi]);
  let normalMapC = new RndNoiseNormal(noiseLevels[nci]);

  // ROUGHNESS & METALNESS

  const plastic = {
    roughness: 1,
    metalness: 0,
  }
  const roughMetal = {
    roughness: 1,
    metalness: 1
  }
  const shinyPlastic = {
    roughness: 0.25,
    metalness: 0
  }
  const shinyMetal = {
    roughness: 0.2,
    metalness: 0.6
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

    console.log('a', a.constructor.name);
    console.log('b', b.constructor.name);
    console.log('c', c.constructor.name);
    return {a, b, c};
  }

  const rm = rmTheme();

  // const themesRoughnessMetalness = [];

  // const allPlastic = () => {
  //   const a = plastic;
  //   const b = plastic;
  //   const c = plastic;
  //   return {a, b, c};
  // }
  // themesRoughnessMetalness.push(allPlastic);

  // const allRoughMetal = () => {
  //   const a = roughMetal;
  //   const b = roughMetal;
  //   const c = roughMetal;
  //   return {a, b, c};
  // }
  // themesRoughnessMetalness.push(allRoughMetal);

  // const allShinyPlastic = () => {
  //   const a = shinyPlastic;
  //   const b = shinyPlastic;
  //   const c = shinyPlastic;
  //   return {a, b, c};
  // }
  // themesRoughnessMetalness.push(allShinyPlastic);

  // const allShinyMetal = () => {
  //   const a = shinyMetal;
  //   const b = shinyMetal;
  //   const c = shinyMetal;
  //   return {a, b, c};
  // }
  // themesRoughnessMetalness.push(allShinyMetal);

  // const t1 = () => {
  //   const a = roughMetal;
  //   const b = roughMetal;
  //   const c = shinyMetal;

  //   const randomized = [a,b,c].sort(() => Math.random() - 0.5);
  //   return {
  //     a: randomized[0],
  //     b: randomized[1],
  //     c: randomized[2],
  //   };
  // }
  // themesRoughnessMetalness.push(t1);

  // const t2 = () => {
  //   const a = roughMetal;
  //   const b = roughMetal;
  //   const c = shinyPlastic;

  //   const randomized = [a,b,c].sort(() => Math.random() - 0.5);
  //   return {
  //     a: randomized[0],
  //     b: randomized[1],
  //     c: randomized[2],
  //   };
  // }
  // themesRoughnessMetalness.push(t2);

  // const t3 = () => {
  //   const a = shinyPlastic;
  //   const b = shinyPlastic;
  //   const c = shinyMetal;

  //   const randomized = [a,b,c].sort(() => Math.random() - 0.5);
  //   return {
  //     a: randomized[0],
  //     b: randomized[1],
  //     c: randomized[2],
  //   };
  // }
  // themesRoughnessMetalness.push(t3);

  handleComposition.a.material = canvasTextureMaterial(
    {...mapsA, ...normalMapA},
    rm.a,
    handleComposition.a.colorComposition.envMapIntensity
  );

  handleComposition.b.material = canvasTextureMaterial(
    {...mapsB, ...normalMapB},
    rm.b,
    handleComposition.b.colorComposition.envMapIntensity
  );

  handleComposition.c.material = canvasTextureMaterial(
    {...mapsC, ...normalMapC},
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
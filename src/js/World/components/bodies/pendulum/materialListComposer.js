import { canvasTextureMaterial } from "../../materials/canvasTextureMaterial";
import { RndNoiseTresholdNormal } from "../../canvasMaps/RndNoiseMaps";

const materialListComposer = (
    materialCompositionID,
    handleComposition,
    envMap
  ) => {

  // DIFFUSE

  const themesDiffuse = [];

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

  let mapsAKeys = Object.keys(mapsA);
  mapsAKeys.forEach(k => mapsA[k] = null);
  
  let mapsBKeys = Object.keys(mapsB);
  mapsBKeys.forEach(k => mapsA[k] = null);
  
  let mapsCKeys = Object.keys(mapsC);
  mapsCKeys.forEach(k => mapsA[k] = null)
}

export { materialListComposer };
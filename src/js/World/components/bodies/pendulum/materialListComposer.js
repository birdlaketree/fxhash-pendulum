import { canvasTextureMaterial } from "../../materials/canvasTextureMaterial";
import { SolidColorMaps } from "../../canvasMaps/SolidColorMaps";
import { RndLinesMaps } from "../../canvasMaps/RndLinesMaps";
import { RndDotsMaps } from "../../canvasMaps/RndDotsMaps";
import { RndDotsNormal } from "../../canvasMaps/RndDotsNormal";
import { RndNoiseNormal } from "../../canvasMaps/RndNoiseNormal";

const materialListComposer = (materialCompositionID, handleComposition) => {
  const themes = [];

  const solidSolidDots = () => {
    const a = SolidColorMaps;
    const b = SolidColorMaps;
    const c = RndDotsMaps;

    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }
  themes.push(solidSolidDots);

  const solidSolidLines = () => {
    const a = SolidColorMaps;
    const b = SolidColorMaps;
    const c = RndLinesMaps;

    const randomized = [a,b,c].sort(() => Math.random() - 0.5);
    return {
      a: randomized[0],
      b: randomized[1],
      c: randomized[2],
    };
  }
  themes.push(solidSolidLines);

  const allSolids = () => {
    const a = SolidColorMaps;
    const b = SolidColorMaps;
    const c = SolidColorMaps;

    return {
      a,
      b,
      c
    };
  }
  themes.push(allSolids);

  const themeIndex = Math.round((themes.length - 1) * materialCompositionID);
  // const themeIndex = 0;
  let maps = themes[themeIndex]();
  console.log('materials:', themes[themeIndex].name);
  let mapsA = new maps.a(handleComposition.a.colorComposition.color);
  let mapsB = new maps.b(handleComposition.b.colorComposition.color);
  let mapsC = new maps.c(handleComposition.c.colorComposition.color);
  
  // let normalMapA = new RndDotsNormal();
  // let normalMapB = new RndDotsNormal();
  // let normalMapC = new RndDotsNormal();
  // let normalMapA = new RndNoiseNormal();
  // let normalMapB = new RndNoiseNormal();
  let normalMapC = new RndNoiseNormal();
  let normalMapA = null;
  let normalMapB = null;
  // let normalMapC = null;
  
  handleComposition.a.material = canvasTextureMaterial({...mapsA, ...normalMapA}, handleComposition.a.colorComposition.envMapIntensity);
  handleComposition.b.material = canvasTextureMaterial({...mapsB, ...normalMapB}, handleComposition.b.colorComposition.envMapIntensity);
  handleComposition.c.material = canvasTextureMaterial({...mapsC, ...normalMapC}, handleComposition.c.colorComposition.envMapIntensity);

  mapsA = null;
  mapsB = null;
  mapsC = null;
  maps = null;
  normalMapA = null;
  normalMapB = null;
  normalMapC = null;
}

export { materialListComposer };
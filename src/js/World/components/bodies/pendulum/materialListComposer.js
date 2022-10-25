import { canvasTextureMaterial } from "../../materials/canvasTextureMaterial";
import { SolidColorMaps } from "../../canvasMaps/SolidColorMaps";
import { RndLinesMaps } from "../../canvasMaps/RndLinesMaps";
import { RndDotsMaps } from "../../canvasMaps/RndDotsMaps";
import { RndDotsNormal } from "../../canvasMaps/RndDotsNormal";
import { RndNoiseNormal } from "../../canvasMaps/RndNoiseNormal";

const materialListComposer = (materialCompositionID, handleComposition) => {
  const canvasMaps = [
    SolidColorMaps,
    RndLinesMaps,
    RndDotsMaps
  ]
  
  const mapsAIndex = Math.round(Math.random() * (canvasMaps.length - 1));
  const mapsBIndex = Math.round(Math.random() * (canvasMaps.length - 1));
  const mapsCIndex = Math.round(Math.random() * (canvasMaps.length - 1));
  let mapsA = canvasMaps[mapsAIndex] != null ? new canvasMaps[mapsAIndex](handleComposition.a.colorComposition.color) : null;
  let mapsB = canvasMaps[mapsBIndex] != null ? new canvasMaps[mapsBIndex](handleComposition.b.colorComposition.color) : null;
  let mapsC = canvasMaps[mapsCIndex] != null ? new canvasMaps[mapsCIndex](handleComposition.c.colorComposition.color) : null;
  
  // let normalMapA = new RndDotsNormal();
  // let normalMapB = new RndDotsNormal();
  // let normalMapC = new RndDotsNormal();
  // let normalMapA = new RndNoiseNormal();
  // let normalMapB = new RndNoiseNormal();
  // let normalMapC = new RndNoiseNormal();
  let normalMapA = null;
  let normalMapB = null;
  let normalMapC = null;
  
  // handleComposition.a.material = frostedPlastic(handleComposition.a.colorComposition.color);
  // handleComposition.b.material = frostedPlastic(handleComposition.b.colorComposition.color);
  // handleComposition.c.material = frostedPlastic(handleComposition.c.colorComposition.color);
  handleComposition.a.material = canvasTextureMaterial({...mapsA, ...normalMapA}, handleComposition.a.colorComposition.envMapIntensity);
  handleComposition.b.material = canvasTextureMaterial({...mapsB, ...normalMapB}, handleComposition.b.colorComposition.envMapIntensity);
  handleComposition.c.material = canvasTextureMaterial({...mapsC, ...normalMapC}, handleComposition.c.colorComposition.envMapIntensity);

  mapsA = null;
  mapsB = null;
  mapsC = null;
  normalMapA = null;
  normalMapB = null;
  normalMapC = null;
}

export { materialListComposer };
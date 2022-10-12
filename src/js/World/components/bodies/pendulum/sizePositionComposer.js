import { mapNumber } from "../../../utils/numUtils";

const sizePositionComposer = () => {
  // make three presets
  // small mid big -- and reverse
  // small big small
  // big small big

  const minW = 0.3;
  const maxW  = 2.4;

  const minHD = 0.1;
  const maxHD = 0.6;

  const maxAspect = 1.25;
  const minAspect = 0.3;

  const minVolume = minW * minHD * minHD;
  const maxVolume = maxW * maxHD * maxHD;

  const r1 = 0;
  const bW       = mapNumber(Math.random(), 0, 1, minW, maxW);
  const bH       = mapNumber(Math.random(), 0, 1, minHD, maxHD);
  const bDAspect = mapNumber(Math.random(), 0, 1, minAspect, maxAspect);
  const bD       = mapNumber(bH * bDAspect, bH * minAspect, bH * maxAspect, minHD, maxHD);
  // const bV = bW * bH * bD;

  const r2 = 0;
  const aW       = mapNumber(Math.random(), 0, 1, minW, maxW);
  const aH       = mapNumber(Math.random(), 0, 1, minHD, maxHD);
  const aAspect = mapNumber(Math.random(), 0, 1, minAspect, maxAspect);
  const aD       = mapNumber(aH * aAspect, aH * minAspect, aH * maxAspect, minHD, maxHD);

  const r3 = 0;
  const cW       = mapNumber(Math.random(), 0, 1, minW, maxW);
  const cH       = mapNumber(Math.random(), 0, 1, minHD, maxHD);
  const cAspect = mapNumber(Math.random(), 0, 1, minAspect, maxAspect);
  const cD       = mapNumber(cH * cAspect, cH * minAspect, cH * maxAspect, minHD, maxHD);

  // console.log('.');
  // console.log('minVolume', minVolume);
  // console.log('maxVolume', maxVolume);

  // console.log('.');
  // console.log('bW', bW);
  // console.log('bH', bH);
  // console.log('bD', bD);

  // const volumeIndex = mapNumber(bV, minVolume, maxVolume, 0, 1);
  // console.log('currentMaxVolume', maxVolume * (1 - volumeIndex));

  // console.log('.');
  // console.log('volumeIndex       ', volumeIndex);

  
  // const nextVolume = volumeIndex * (Math.random() * 1.5 - 1.5/2);
  // console.log('nextVolume       ', nextVolume);

  // const aVRange = mapNumber(Math.random(), 0, 1, bV/2, bV*2);
  // const aV = mapNumber(aVRange, bV/2, bV*2, minVolume, maxVolume);
  // const aW = mapNumber(Math.random(), 0, 1, minW, maxW);
  // const ard = mapNumber(Math.random(), 0, 1, minAspect, maxAspect);
  // const arh = 1/ard;
  // const aH = Math.pow(aV/aW * arh, 1/2);
  // const aD = Math.pow(aV/aW * ard, 1/2);

  // const cVRange = mapNumber(Math.random(), 0, 1, bV/2, bV*2);
  // const cV = mapNumber(cVRange, bV/2, bV*2, minVolume, maxVolume);
  // const cW = mapNumber(Math.random(), 0, 1, minW, maxW);
  // const crd = mapNumber(Math.random(), 0, 1, minAspect, maxAspect);
  // const crh = 1/crd;
  // const cH = Math.pow(cV/cW * crh, 1/2);
  // const cD = Math.pow(cV/cW * crd, 1/2);

  // console.log('.');
  // console.log('bV       ', bV);
  // console.log('aV       ', aV);

  // console.log('.');
  // console.log('ard       ', ard);
  // console.log('arh       ', arh);

  const size = {
    a: {
      width:  aW,
      height: aH,
      depth:  aD
    },
    b: {
      width:  bW,
      height: bH,
      depth:  bD
    },
    c: {
      width:  cW,
      height: cH,
      depth:  cD
    }
  }

  const initY = 1;

  const translation = {
    a: {
      x: -bW/2 - aW/2 + bH/2 + aH/2,
      y: initY,
      z: bD/2 + aD/2
    },
    b: {
      x: 0,
      y: initY,
      z: 0
    },
    c: {
      x: bW/2 + cW/2 - bH/2 - cH/2,
      y: initY,
      z: -bD/2 - cD/2
    }
  }

  return {
    size,
    translation
  }
}

export { sizePositionComposer };
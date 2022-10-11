import { mapNumber } from "../../../utils/numUtils";

const sizeComposer = () => {
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

  const rb = 0;

  const bW       = mapNumber(rb, 0, 1, minW, maxW);
  const bH       = mapNumber(rb, 0, 1, minHD, maxHD);
  const bDAspect = mapNumber(rb, 0, 1, minAspect, maxAspect);
  const bD       = mapNumber(bH * bDAspect, bH * minAspect, bH * maxAspect, minHD, maxHD);
  const bV = bW * bH * bD;

  console.log('.');
  console.log('minVolume', minVolume);
  console.log('maxVolume', maxVolume);

  const aW       = mapNumber(Math.random(), 0, 1, minW, maxW);
  const aH       = mapNumber(Math.random(), 0, 1, minHD, maxHD);
  const aDAspect = mapNumber(Math.random(), 0, 1, minAspect, maxAspect);
  const aD       = mapNumber(aH * aDAspect, aH * minAspect, aH * maxAspect, minHD, maxHD);

  const cW       = mapNumber(Math.random(), 0, 1, minW, maxW);
  const cH       = mapNumber(Math.random(), 0, 1, minHD, maxHD);
  const cDAspect = mapNumber(Math.random(), 0, 1, minAspect, maxAspect);
  const cD       = mapNumber(cH * cDAspect, cH * minAspect, cH * maxAspect, minHD, maxHD);


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

  const a = {
    width:  aW,
    height: aH,
    depth:  aD
  }
  const b = {
    width:  bW,
    height: bH,
    depth:  bD
  }
  const c = {
    width:  cW,
    height: cH,
    depth:  cD
  }

  // console.log('a', a);
  // console.log('b', b);
  // console.log('c', c);

  return {
    size: {
      a,
      b,
      c
    },
    translation: {
      x: 0,
      y: 0,
      z: 0
    }
  }
}

export { sizeComposer };
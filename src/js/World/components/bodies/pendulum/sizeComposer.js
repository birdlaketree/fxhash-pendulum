const sizeComposer = () => {
  // make three presets
  // small mid big -- and reverse
  // small big small
  // big small big

  const minW = 0.2;
  const minHD = 0.06;
  const maxW  = 2.4;
  const maxHD = 1;

  const aspectRatioRange = 1.25;
  // const invAspect = 1/aspectRatioRange
  const invAspect = 1/3.3;

  const bW = Math.random() * (maxW  - minW)  + minW;
  const bH = Math.random() * (maxHD - minHD) + minHD;
  const bD = bH * Math.random() * (1.25  - 0.3) + 0.3; // 0.3 - 1.25
  const bV = bW * bH * bD;

  // const aW = Math.random() * (maxW  - minW)  + minW;
  // const aH = Math.random() * (maxHD - minHD) + minHD;
  // const aD = aH * Math.random() * (1.25  - 0.3) + 0.3; // 0.3 - 1.25

  // const cW = Math.random() * (maxW  - minW)  + minW;
  // const cH = Math.random() * (maxHD - minHD) + minHD;
  // const cD = cH * Math.random() * (1.25  - 0.3) + 0.3; // 0.3 - 1.25

  // percentage of volume used as a reference - find optimal value
  const aV = Math.random() * bV + bV/5;
  const aW = Math.random() * (maxW - minW) + minW;
  const ard = Math.random() * (aspectRatioRange - invAspect) + invAspect;
  const arh = 1/ard;
  const aH = Math.pow(aV/aW * arh, 1/2);
  const aD = Math.pow(aV/aW * ard, 1/2);

  // percentage of volume used as a reference - find optimal value
  const cV = Math.random() * bV + bV/2;
  const cW = Math.random() * (maxW - minW) + minW;
  const crd = Math.random() * (aspectRatioRange - invAspect) + invAspect;
  const crh = 1/crd;
  const cH = Math.pow(cV/cW * crh, 1/2);
  const cD = Math.pow(cV/cW * crd, 1/2);

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

  return {
    a,
    b,
    c
  }
}

export { sizeComposer };
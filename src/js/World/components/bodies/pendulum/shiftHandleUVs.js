const shiftHandleUVs = (conf, uvAttribute) => {
  const w = conf.size.width;
  const h = conf.size.height;
  const d = conf.size.depth;
  const mw = conf.extremes.maxWidth;

  // left & right

  uvAttribute.setXY(
    0,
    u = (1 - d/mw)/2,
    v = (1 - h/mw)/2 + h/mw
  );
  uvAttribute.setXY(
    1,
    u = (1 - d/mw)/2 + d/mw,
    v = (1 - h/mw)/2 + h/mw
  );
  uvAttribute.setXY(
    2,
    u = (1 - d/mw)/2,
    v = (1 - h/mw)/2
  );
  uvAttribute.setXY(
    3,
    u = (1 - d/mw)/2 + d/mw,
    v = (1 - h/mw)/2
  );

  uvAttribute.setXY(
    4,
    u = (1 - d/mw)/2,
    v = (1 - h/mw)/2 + h/mw
  );
  uvAttribute.setXY(
    5,
    u = (1 - d/mw)/2 + d/mw,
    v = (1 - h/mw)/2 + h/mw
  );
  uvAttribute.setXY(
    6,
    u = (1 - d/mw)/2,
    v = (1 - h/mw)/2
  );
  uvAttribute.setXY(
    7,
    u = (1 - d/mw)/2 + d/mw,
    v = (1 - h/mw)/2
  );

  // top & bottom

  uvAttribute.setXY(
    8,
    u = (1 - w/mw)/2,
    v = (1 - d/mw)/2 + d/mw
  );
  uvAttribute.setXY(
    9,
    u = (1 - w/mw)/2 + w/mw,
    v = (1 - d/mw)/2 + d/mw
  );
  uvAttribute.setXY(
    10,
    u = (1 - w/mw)/2,
    v = (1 - d/mw)/2
  );
  uvAttribute.setXY(
    11,
    u = (1 - w/mw)/2 + w/mw,
    v = (1 - d/mw)/2
  );

  uvAttribute.setXY(
    12,
    u = (1 - w/mw)/2,
    v = (1 - d/mw)/2 + d/mw
  );
  uvAttribute.setXY(
    13,
    u = (1 - w/mw)/2 + w/mw,
    v = (1 - d/mw)/2 + d/mw
  );
  uvAttribute.setXY(
    14,
    u = (1 - w/mw)/2,
    v = (1 - d/mw)/2
  );
  uvAttribute.setXY(
    15,
    u = (1 - w/mw)/2 + w/mw,
    v = (1 - d/mw)/2
  );

  // front and back

  uvAttribute.setXY(
    16,
    u = (1 - w/mw)/2,
    v = (1 - h/mw)/2 + h/mw
  );
  uvAttribute.setXY(
    17,
    u = (1 - w/mw)/2 + w/mw,
    v = (1 - h/mw)/2 + h/mw
  );
  uvAttribute.setXY(
    18,
    u = (1 - w/mw)/2,
    v = (1 - h/mw)/2
  );
  uvAttribute.setXY(
    19,
    u = (1 - w/mw)/2 + w/mw,
    v = (1 - h/mw)/2
  );

  uvAttribute.setXY(
    20,
    u = (1 - w/mw)/2,
    v = (1 - h/mw)/2 + h/mw
  );
  uvAttribute.setXY(
    21,
    u = (1 - w/mw)/2 + w/mw,
    v = (1 - h/mw)/2 + h/mw
  );
  uvAttribute.setXY(
    22,
    u = (1 - w/mw)/2,
    v = (1 - h/mw)/2
  );
  uvAttribute.setXY(
    23,
    u = (1 - w/mw)/2 + w/mw,
    v = (1 - h/mw)/2
  );
}

export { shiftHandleUVs }
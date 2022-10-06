const cubeMaterial = (
  material,
  mapsGenerator,
  colorComposition,
  cubeSize,
  textureSizeMultiplier
) => {
  let maps = new mapsGenerator(colorComposition.color);
  const tsf = textureSizeMultiplier;
  const cm =  [
    material(maps, colorComposition.envMapIntensity, cubeSize.depth * tsf, cubeSize.depth/(cubeSize.depth/cubeSize.height) * tsf),
    material(maps, colorComposition.envMapIntensity, cubeSize.depth * tsf, cubeSize.depth/(cubeSize.depth/cubeSize.height) * tsf),
    material(maps, colorComposition.envMapIntensity, cubeSize.width * tsf, cubeSize.width/(cubeSize.width/cubeSize.depth)  * tsf),
    material(maps, colorComposition.envMapIntensity, cubeSize.width * tsf, cubeSize.width/(cubeSize.width/cubeSize.depth)  * tsf),
    material(maps, colorComposition.envMapIntensity, cubeSize.width * tsf, cubeSize.width/(cubeSize.width/cubeSize.height) * tsf),
    material(maps, colorComposition.envMapIntensity, cubeSize.width * tsf, cubeSize.width/(cubeSize.width/cubeSize.height) * tsf)
  ];
  maps = null; // delete canvas as it is not needed anymore
  return cm;
}

export { cubeMaterial };
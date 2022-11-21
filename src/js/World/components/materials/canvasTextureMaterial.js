import { Vector2, MeshPhysicalMaterial, CanvasTexture, RepeatWrapping, Color } from 'three';
// import { GUI } from 'dat.gui';

const canvasTextureMaterial = (
    maps,
    props = null,
    envMapIntensity = 1,
    repeatX = 1,
    repeatY = 1
  ) => {
  const colorMap = maps.colorMap ? new CanvasTexture(maps.colorMap) : null;
  if (colorMap) {
    colorMap.repeat.x = repeatX;
    colorMap.repeat.y = repeatY;
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;
  }

  const roughnessMap = maps.roughnessMap ? new CanvasTexture(maps.roughnessMap) : null;
  if (roughnessMap) {
    roughnessMap.repeat.x = repeatX;
    roughnessMap.repeat.y = repeatY;
    roughnessMap.wrapS = RepeatWrapping;
    roughnessMap.wrapT = RepeatWrapping;
  };

  const metalnessMap = maps.metalnessMap ? new CanvasTexture(maps.metalnessMap) : null;
  if (metalnessMap) {
    metalnessMap.repeat.x = repeatX;
    metalnessMap.repeat.y = repeatY;
    metalnessMap.wrapS = RepeatWrapping;
    metalnessMap.wrapT = RepeatWrapping;
  };

  const normalMap = maps.normalMap ? new CanvasTexture(maps.normalMap) : null;
  if (normalMap) {
    normalMap.repeat.x = repeatX;
    normalMap.repeat.y = repeatY;
    normalMap.wrapS = RepeatWrapping;
    normalMap.wrapT = RepeatWrapping;
  };

  const envMap    = maps.envMap ? maps.envMap : null;
  const color     = props.color ? props.color : null;
  const roughness = props.roughness ? props.roughness : null;
  const metalness = props.metalness ? props.metalness : null;

  const parameters = {
    // STANDARD

    envMap: envMap,
    envMapIntensity: envMapIntensity,

    color: color,
    map: colorMap ? colorMap : null,

    roughness: roughness,
    roughnessMap: roughnessMap ? roughnessMap : null,

    normalMap: normalMap ? normalMap : null,
		normalScale: new Vector2(1, 1),

    // aoMap: aoMap,
    // aoMapIntensity:

    // bumpMap: bumpMap,
    // bumpScale:

    // emissive:
    // emissiveMap: emissiveMap,

    // displacementMap
    // displacementScale
    // displacementBias

    metalness: metalness,
    metalnessMap: metalnessMap ? metalnessMap : null,

    // alphaMap: alphaMap,

    // PHYSICAL

    // clearcoat:
    // clearcoatMap: clearcoatMap,
    // clearcoatRoughness:
    // clearcoatRoughnessMap:
    // clearcoatNormalScale: 
    // clearcoatNormalMap:

    // reflectivity:
    // ior:

    // sheen:
    // sheenColor:
    // sheenRoughness:

    // transmission:
    // transmissionMap: transmissionMap,
    // attenuationDistance:
    // attenuationColor:

    // specularIntensity:
    // specularColor:
    // specularIntensityMap:
    // specularColorMap:

    // onBeforeCompile: obc
  } 

  const material = new MeshPhysicalMaterial(parameters);

  // const gui = new GUI();
  // const cubeFolder = gui.addFolder('Material');
  // cubeFolder.add(material, 'roughness', 0, 1);
  // cubeFolder.add(material, 'metalness', 0, 1);
  // cubeFolder.open();

  return material;
}

export {
  canvasTextureMaterial
};
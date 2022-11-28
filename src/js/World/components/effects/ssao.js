import { GUI } from 'dat.gui';
import { BlendFunction, NormalPass, SSAOEffect, SMAAEffect, SMAAPreset, EdgeDetectionMode, EffectComposer, EffectPass, RenderPass, TextureEffect, DepthDownsamplingPass } from "postprocessing";

const ssao = (
  camera,
  scene,
  renderer
) => {
  const capabilities = renderer.capabilities;
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  
  const normalPass = new NormalPass(scene, camera);
  const depthDownsamplingPass = new DepthDownsamplingPass({
    normalBuffer: normalPass.texture,
    resolutionScale: 0.5
  });

  const normalDepthBuffer = capabilities.isWebGL2 ?
    depthDownsamplingPass.texture : null;

  const smaaEffect = new SMAAEffect();
  smaaEffect.preset = SMAAPreset.HIGH;
  smaaEffect.edgeDetectionMode = EdgeDetectionMode.DEPTH;

  smaaEffect.edgeDetectionMaterial.setEdgeDetectionThreshold(0.01);
  
  const ssaoEffect = new SSAOEffect(camera, normalPass.texture, {
    blendFunction: BlendFunction.MULTIPLY,
    distanceScaling: true,
    depthAwareUpsampling: true,
    normalDepthBuffer,
    samples: 6,
    rings: 4,
    distanceThreshold: 0.2,	// Render up to a distance of ~200 world units
    distanceFalloff: 0.0025,	// with an additional ~2.5 units of falloff.
    rangeThreshold: 0.0003,		// Occlusion proximity of ~0.3 world units
    rangeFalloff: 0.0001,			// with ~0.1 units of falloff.
    luminanceInfluence: 0.6,
    minRadiusScale: 0.33,
    radius: 0.05,
    intensity: 2.0,
    bias: 0.025,
    fade: 0.05,
    color: null,
    resolutionScale: 1.0,
  });

  const textureEffect = new TextureEffect({
    blendFunction: BlendFunction.SKIP,
    texture: depthDownsamplingPass.texture
  });

  const effectPass = new EffectPass(camera, smaaEffect, ssaoEffect, textureEffect);
  composer.addPass(normalPass);

  if(capabilities.isWebGL2) {
    composer.addPass(depthDownsamplingPass);
  } else {
    console.log("WebGL 2 not supported, falling back to naive depth downsampling");
  }

  composer.addPass(effectPass);

  // const gui = new GUI();
  // gui.add( ssaoEffect, 'intensity', 0.0, 10.0 );
  // gui.add( ssaoEffect.resolution, 'scale', 0.0, 2.0 );
  
  return composer;
}

export { ssao };
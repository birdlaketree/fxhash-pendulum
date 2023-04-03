import { GUI } from 'dat.gui';
import * as POSTPROCESSING from "postprocessing"
import { SSGIEffect, TRAAEffect, MotionBlurEffect, VelocityDepthNormalPass } from "realism-effects"
import { BlendFunction, NormalPass, SSAOEffect, SMAAEffect, SMAAPreset, EdgeDetectionMode, EffectComposer, EffectPass, RenderPass, TextureEffect, DepthDownsamplingPass } from "postprocessing";
import { SSGIDebugGUI } from '../../utils/SSGIDebugGUI';

const ssao = (
  camera,
  scene,
  renderer
) => {
  
  const composer = new POSTPROCESSING.EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera));

  const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)
  composer.addPass(velocityDepthNormalPass)

  const options = {
		distance: 2.0,
		thickness: 1.3,
		autoThickness: false,
		maxRoughness: 1,
		blend: 0.95,
		denoiseIterations: 4,
		denoiseKernel: 3,
		denoiseDiffuse: 25,
		denoiseSpecular: 25.5,
		depthPhi: 5,
		normalPhi: 28,
		roughnessPhi: 18.75,
		envBlur: 0.5,
		importanceSampling: false,
		directLightMultiplier: 1,
		steps: 20,
		refineSteps: 4,
		spp: 1,
		resolutionScale: 1,
		missedRays: false
	}

  const ssgiEffect = new SSGIEffect(scene, camera, velocityDepthNormalPass, options)
  
  // const traaEffect = new TRAAEffect(scene, camera, velocityDepthNormalPass)
  const smaaEffect = new SMAAEffect();
  smaaEffect.preset = SMAAPreset.ULTRA;
  smaaEffect.edgeDetectionMode = EdgeDetectionMode.DEPTH;
  smaaEffect.edgeDetectionMaterial.edgeDetectionThreshold = 0.05;
  const motionBlurEffect = new MotionBlurEffect(velocityDepthNormalPass)
  const effectPass = new POSTPROCESSING.EffectPass(camera, ssgiEffect)
  const effectPass2 = new POSTPROCESSING.EffectPass(camera, smaaEffect, motionBlurEffect)
  composer.addPass(effectPass)
  composer.addPass(effectPass2)

  // const gui = new SSGIDebugGUI(ssgiEffect, options)

  // ---

  // const capabilities = renderer.capabilities;
  // const composer = new EffectComposer(renderer);
  // composer.addPass(new RenderPass(scene, camera));
  
  // const normalPass = new NormalPass(scene, camera);
  // const depthDownsamplingPass = new DepthDownsamplingPass({
  //   normalBuffer: normalPass.texture,
  //   resolutionScale: 1.0
  // });

  // const normalDepthBuffer = capabilities.isWebGL2 ? depthDownsamplingPass.texture : null;

  // const smaaEffect = new SMAAEffect();
  // smaaEffect.preset = SMAAPreset.ULTRA;
  // smaaEffect.edgeDetectionMode = EdgeDetectionMode.DEPTH;
  // smaaEffect.edgeDetectionMaterial.edgeDetectionThreshold = 0.05;

  // const ssaoEffect = new SSAOEffect(camera, normalPass.texture, {
  //   blendFunction: BlendFunction.MULTIPLY,
  //   // blendFunction: BlendFunction.NORMAL,
  //   distanceScaling: false,
  //   depthAwareUpsampling: false,
  //   normalDepthBuffer,
  //   samples: 16,
  //   rings: 3,
  //   worldDistanceThreshold: 35,
  //   worldDistanceFalloff: 10,
  //   luminanceInfluence: 0.6,
  //   minRadiusScale: 0.1,
  //   radius: 0.075,
  //   intensity: 10,
  //   bias: 0.082,
  //   // fade: 0.085,
  //   fade: 0.095,
  //   color: null,
  //   resolutionScale: 1.0,
  // });

  // const textureEffect = new TextureEffect({
  //   blendFunction: BlendFunction.SKIP,
  //   texture: depthDownsamplingPass.texture
  // });

  // const effectPass = new EffectPass(camera, smaaEffect, ssaoEffect, textureEffect);
  // composer.addPass(normalPass);

  // if(capabilities.isWebGL2) {
  //   composer.addPass(depthDownsamplingPass);
  // } else {
  //   console.log("WebGL 2 not supported, falling back to naive depth downsampling");
  // }

  // composer.addPass(effectPass);

  // ---

  // const blendMode = ssaoEffect.blendMode;
  // const uniforms = ssaoEffect.ssaoMaterial.uniforms;

  // const params = {
  //   "distance": {
  //     "threshold": uniforms.distanceCutoff.value.x,
  //     "falloff": (uniforms.distanceCutoff.value.y -
  //       uniforms.distanceCutoff.value.x)
  //   },
  //   "proximity": {
  //     "threshold": uniforms.proximityCutoff.value.x,
  //     "falloff": (uniforms.proximityCutoff.value.y -
  //       uniforms.proximityCutoff.value.x)
  //   },
  //   "upsampling": {
  //     "enabled": ssaoEffect.defines.has("DEPTH_AWARE_UPSAMPLING"),
  //     "threshold": Number(ssaoEffect.defines.get("THRESHOLD"))
  //   },
  //   "distanceScaling": {
  //     "enabled": ssaoEffect.distanceScaling,
  //     "min scale": uniforms.minRadiusScale.value
  //   },
  //   "lum influence": ssaoEffect.uniforms.get("luminanceInfluence").value,
  //   "intensity": uniforms.intensity.value,
  //   "bias": uniforms.bias.value,
  //   "fade": uniforms.fade.value,
  //   // "render mode": RenderMode.DEFAULT,
  //   "resolution": ssaoEffect.resolution.scale,
  //   "color": 0x000000,
  //   "opacity": blendMode.opacity.value,
  //   "blend mode": blendMode.blendFunction
  // };

  // const gui = new GUI();
  // gui.add(ssaoEffect, 'intensity', 0.0, 20.0 );
  // gui.add(ssaoEffect, "samples", 1, 32, 1);
	// gui.add(ssaoEffect, "rings", 1, 16, 1);
	// gui.add(ssaoEffect, "radius", 1e-6, 1.0, 0.001);
  // gui.add(params, "bias", 0.0, 0.2, 0.001).onChange((value) => {uniforms.bias.value = value;});
  // gui.add(params, "fade", 0.0, 0.2, 0.001).onChange((value) => {uniforms.fade.value = value;});
  
  return composer;
}

export { ssao };
import { MathUtils } from 'three';
import { JointData } from '@dimforge/rapier3d-compat';
import { handle } from './handle';
import { colorComposer } from './colorComposer';
import { RndDotsMaps } from '../../canvasMaps/RndDotsMaps';
import { canvasTextureMaterial } from '../../materials/canvasTextureMaterial';
import { cubeMaterialComposer } from '../../../utils/cubeMaterialComposer'
import { sizePositionComposer } from './sizePositionComposer';
import { RndDotsNormal } from '../../canvasMaps/RndDotsNormal';
import { RndNoiseNormal } from '../../canvasMaps/RndNoiseNormal';

import { frostedPlastic } from '../../materials/frostedPlastic';

const pendulum = (
    scene,
    loop,
    physicsWorld
  ) => {
  const colorCompositionID = Math.random();
  const colorComposition = colorComposer(colorCompositionID);

  const sizeAndPositionID = Math.random();
  const sizeAndPosition = sizePositionComposer(sizeAndPositionID);

  const hAConf = {
    colorComposition : colorComposition.a,
    size: sizeAndPosition.size.a,
    translation : sizeAndPosition.translation.a,
    rotation: {x: 0, y: 0, z: 0},
    anchor: {x: 0, y: 0, z: 0},
    volume: sizeAndPosition.volume.a
  }

  const hBConf = {
    colorComposition : colorComposition.b,
    size: sizeAndPosition.size.b,
    translation : sizeAndPosition.translation.b,
    rotation: {x: 0, y: 0, z: 0},
    anchor: {x: 0, y: 0, z: 0},
    volume: sizeAndPosition.volume.b
  }

  const hCConf = {
    colorComposition : colorComposition.c,
    size: sizeAndPosition.size.c,
    translation : sizeAndPosition.translation.c,
    rotation: {x: 0, y: 0, z: 0},
    anchor: {x: 0, y: 0, z: 0},
    volume: sizeAndPosition.volume.c
  }

  // materials

  let mapsA = new RndDotsMaps(hAConf.colorComposition.color);
  let mapsB = new RndDotsMaps(hBConf.colorComposition.color);
  let mapsC = new RndDotsMaps(hCConf.colorComposition.color);
  // let normalMapA = new RndDotsNormal();
  // let normalMapB = new RndDotsNormal();
  // let normalMapC = new RndDotsNormal();
  let normalMapA = new RndNoiseNormal();
  let normalMapB = new RndNoiseNormal();
  let normalMapC = new RndNoiseNormal();
  // hAConf.material = frostedPlastic(hAConf.colorComposition.color);
  // hBConf.material = frostedPlastic(hBConf.colorComposition.color);
  // hCConf.material = frostedPlastic(hCConf.colorComposition.color);
  hAConf.material = cubeMaterialComposer(canvasTextureMaterial, {...mapsA, ...normalMapA}, hAConf, 2);
  hBConf.material = cubeMaterialComposer(canvasTextureMaterial, {...mapsB, ...normalMapB}, hBConf, 2);
  hCConf.material = cubeMaterialComposer(canvasTextureMaterial, {...mapsC, ...normalMapC}, hCConf, 2);
  mapsA = null;
  mapsB = null;
  mapsC = null;
  normalMapA = null;
  normalMapB = null;
  normalMapC = null;

  // handles

  const handleA = handle(hAConf, physicsWorld);
  scene.add(handleA.mesh);
  loop.bodies.push(handleA);

  const handleB = handle(hBConf, physicsWorld);
  scene.add(handleB.mesh);
  loop.bodies.push(handleB);

  const handleC = handle(hCConf, physicsWorld);
  scene.add(handleC.mesh);
  loop.bodies.push(handleC);

  // joints

  const createJoints = () => {
    let hAConfXOffset = hAConf.size.height/2;
    if (hAConf.size.height >= hAConf.size.width) {
      hAConfXOffset = hAConf.size.width/2;
    };

    let hBConfXOffset = hBConf.size.height/2;
    if (hBConf.size.height >= hBConf.size.width) {
      hBConfXOffset = hBConf.size.width/2;
    };

    let hCConfXOffset = hCConf.size.height/2;
    if (hCConf.size.height >= hCConf.size.width) {
      hCConfXOffset = hCConf.size.width/2;
    };

    let x = { x: 0.0, y: 0.0, z: 1.0 };
    let paramsA = JointData.revolute(
      { 
        x: hAConf.size.width/2 - hAConfXOffset,
        y: 0.0,
        z: -hAConf.size.depth/2
      },
      { 
        x: -hBConf.size.width/2 + hBConfXOffset,
        y: 0.0,
        z: hBConf.size.depth/2
      },
      x
    );
    let jointA = physicsWorld.createImpulseJoint(paramsA, handleA.rigidBody, handleB.rigidBody, false);
  
    let paramsB = JointData.revolute(
      {
        x: hBConf.size.width/2 - hBConfXOffset,
        y: 0.0,
        z: -hBConf.size.depth/2
      },
      {
        x: -hCConf.size.width/2 + hCConfXOffset,
        y: 0.0,
        z: hCConf.size.depth/2
      },
      x
    );
    let jointB = physicsWorld.createImpulseJoint(paramsB, handleB.rigidBody, handleC.rigidBody, false);

    jointA.tick = (delta) => {
      const treshold = Math.random();
      if (treshold < 0.02) {
        handleA.rigidBody.wakeUp();
        handleB.rigidBody.wakeUp();
        handleC.rigidBody.wakeUp();
        const angleRangeDeg = 720;
        const rndAngleRad = MathUtils.degToRad(Math.random() * angleRangeDeg - angleRangeDeg/2);
        const stiffness = Math.random() * 200 + (100 * hAConf.volume * hBConf.volume); // strength of the force that will be applied to make the bodies reach the target relative positions
        const damping   = Math.random() * 0.6 + 0.3;   // strength of the force that will be applied to make the bodies reach the target relative velocities 
        jointA.configureMotorPosition(rndAngleRad, stiffness, damping);
      }
    }
  
    jointB.tick = (delta) => {
      const treshold = Math.random();
      if (treshold < 0.02) {
        handleA.rigidBody.wakeUp();
        handleB.rigidBody.wakeUp();
        handleC.rigidBody.wakeUp();
        const angleRangeDeg = 720;
        const rndAngleRad = MathUtils.degToRad(Math.random() * angleRangeDeg - angleRangeDeg/2);
        const stiffness = Math.random() * 200 + (100 * hBConf.volume * hCConf.volume); // strength of the force that will be applied to make the bodies reach the target relative positions
        const damping   = Math.random() * 0.6 + 0.3;   // strength of the force that will be applied to make the bodies reach the target relative velocities 
        jointB.configureMotorPosition(rndAngleRad, stiffness, damping);
      }
    }

    loop.updatableBodies.push(jointA);
    loop.updatableBodies.push(jointB); 
  }

  createJoints();
}

export { pendulum };
import { MathUtils } from 'three';
import { JointData } from '@dimforge/rapier3d-compat';
import { handle } from './handle';
import { colorComposer } from './colorComposer';
import { defaultColorMattPlastic } from '../../materials/defaultColorMattPlastic';

const pendulum = (
    scene,
    loop,
    physicsWorld
  ) => {

  const colorCompositionID = Math.random();
  const colorComposition = colorComposer(colorCompositionID);

  const materialA = defaultColorMattPlastic(colorComposition.a.color, colorComposition.a.envMapIntensity);
  const materialB = defaultColorMattPlastic(colorComposition.b.color, colorComposition.b.envMapIntensity);
  const materialC = defaultColorMattPlastic(colorComposition.c.color, colorComposition.c.envMapIntensity);

  const hAConf = {
    size: {
      width: Math.random() * 1.6 + 0.6,
      height: Math.random() * 0.3 + 0.04,
      depth: Math.random() * 0.3 + 0.04
    },
    translation : {
      x: -1,
      y: 1,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    anchor: {
      x: 0,
      y: 0,
      z: 0
    },
    material : materialA
  }

  const hBConf = {
    size: {
      width: Math.random() * 1.2 + 0.2,
      height: Math.random() * 0.6 + 0.05,
      depth: Math.random() * 0.6 + 0.05
    },
    translation : {
      x: 0,
      y: 1,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    anchor: {
      x: 0,
      y: 0,
      z: 0
    },
    material : materialB
  }

  const hCConf = {
    size: {
      width: Math.random() * 1.8 + 0.4,
      height: Math.random() * 0.6 + 0.04,
      depth: Math.random() * 0.6 + 0.04
    },
    translation : {
      x: 1,
      y: 1,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    anchor: {
      x: 0,
      y: 0,
      z: 0
    },
    material : materialC
  }

  const handleA = handle(hAConf, physicsWorld);
  scene.add(handleA.mesh);
  loop.bodies.push(handleA);

  const handleB = handle(hBConf, physicsWorld);
  scene.add(handleB.mesh);
  loop.bodies.push(handleB);

  const handleC = handle(hCConf, physicsWorld);
  scene.add(handleC.mesh);
  loop.bodies.push(handleC);

  let x = { x: 0.0, y: 0.0, z: 1.0 };
  let paramsA = JointData.revolute(
    { 
      x: hAConf.size.width/2 - hAConf.size.height/2,
      y: 0.0,
      z: 0.0
    },
    { 
      x: -hBConf.size.width/2 + hBConf.size.height/2,
      y: 0.0,
      z: hAConf.size.depth/2 + hBConf.size.depth/2
    },
    x
  );
  let jointA = physicsWorld.createImpulseJoint(paramsA, handleA.rigidBody, handleB.rigidBody, true);

  let paramsB = JointData.revolute(
    {
      x: hBConf.size.width/2 - hBConf.size.height/2,
      y: 0.0,
      z: 0.0
    },
    {
      x: -hCConf.size.width/2 + hCConf.size.height/2,
      y: 0.0,
      z: hBConf.size.depth/2 + hCConf.size.depth/2
    },
    x
  );
  let jointB = physicsWorld.createImpulseJoint(paramsB, handleB.rigidBody, handleC.rigidBody, true);

  jointA.tick = (delta) => {
    const treshold = Math.random();
    if (treshold < 0.02) {
      handleA.rigidBody.wakeUp();
      handleB.rigidBody.wakeUp();
      handleC.rigidBody.wakeUp();
      const angleRangeDeg = 720;
      const rndAngleRad = MathUtils.degToRad(Math.random() * angleRangeDeg - angleRangeDeg/2);
      const stiffness = Math.random() * 100 + 400;
      jointA.configureMotorPosition(rndAngleRad, stiffness, 0.6);
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
      const stiffness = Math.random() * 300 + 200;
      jointB.configureMotorPosition(rndAngleRad, stiffness, 0.6);
    }
  }

  loop.updatableBodies.push(jointA);
  loop.updatableBodies.push(jointB);
}

export { pendulum };
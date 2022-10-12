import { MathUtils } from 'three';
import { JointData } from '@dimforge/rapier3d-compat';
import { handle } from './handle';
import { colorComposer } from './colorComposer';
import { NoiseMaps } from '../../textures/NoiseMaps';
import { dynamicMapsMaterial } from '../../materials/dynamicMapsMaterial';
import { cubeMaterialComposer } from '../../../utils/cubeMaterialComposer'
import { sizePositionComposer } from './sizePositionComposer';

const pendulum = (
    scene,
    loop,
    physicsWorld
  ) => {
  const colorCompositionID = Math.random();
  const colorComposition = colorComposer(colorCompositionID);
  const sizeAndPosition = sizePositionComposer();

  // handles configuration

  const hAConf = {
    colorComposition : colorComposition.a,
    size: sizeAndPosition.size.a,
    translation : sizeAndPosition.translation.a,
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    anchor: {
      x: 0,
      y: 0,
      z: 0
    }
  }

  const hBConf = {
    colorComposition : colorComposition.b,
    size: sizeAndPosition.size.b,
    translation : sizeAndPosition.translation.b,
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    anchor: {
      x: 0,
      y: 0,
      z: 0
    }
  }

  const hCConf = {
    colorComposition : colorComposition.c,
    size: sizeAndPosition.size.c,
    translation : sizeAndPosition.translation.c,
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
    
  }

  // create materials

  let mapsA = new NoiseMaps(hAConf.colorComposition.color);
  let mapsB = new NoiseMaps(hBConf.colorComposition.color);
  let mapsC = new NoiseMaps(hCConf.colorComposition.color);
  hAConf.material = cubeMaterialComposer(dynamicMapsMaterial, mapsA, hAConf, 2);
  hBConf.material = cubeMaterialComposer(dynamicMapsMaterial, mapsB, hBConf, 2);
  hCConf.material = cubeMaterialComposer(dynamicMapsMaterial, mapsC, hCConf, 2);
  mapsA = null;
  mapsB = null;
  mapsC = null;

  // create handles

  const handleA = handle(hAConf, physicsWorld);
  scene.add(handleA.mesh);
  loop.bodies.push(handleA);

  const handleB = handle(hBConf, physicsWorld);
  scene.add(handleB.mesh);
  loop.bodies.push(handleB);

  const handleC = handle(hCConf, physicsWorld);
  scene.add(handleC.mesh);
  loop.bodies.push(handleC);

  // create joints

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
        x: -hCConf.size.width/2 + hBConfXOffset,
        y: 0.0,
        z: hCConf.size.depth/2
      },
      x
    );
    let jointB = physicsWorld.createImpulseJoint(paramsB, handleB.rigidBody, handleC.rigidBody, false);

    jointA.tick = (delta) => {
      // console.log('jointA.isValid', jointA.isValid());
      // console.log('jointA.limitsMax', jointA.limitsMax());
      const treshold = Math.random();
      if (treshold < 0.02) {
        handleA.rigidBody.wakeUp();
        handleB.rigidBody.wakeUp();
        handleC.rigidBody.wakeUp();
        const angleRangeDeg = 720;
        const rndAngleRad = MathUtils.degToRad(Math.random() * angleRangeDeg - angleRangeDeg/2);
        // const stiffness = Math.random() * 100 + 400;

        const stiffness = 200; // strength of the force that will be applied to make the bodies reach the target relative positions
        const damping = 0.9;   // strength of the force that will be applied to make the bodies reach the target relative velocities 
        
        // console.log('rndAngleRad', rndAngleRad);
        jointA.configureMotorPosition(rndAngleRad, stiffness, damping);
      }
    }
  
    jointB.tick = (delta) => {
      // console.log('jointB.isValid', jointB.isValid());
      const treshold = Math.random();
      if (treshold < 0.02) {
        handleA.rigidBody.wakeUp();
        handleB.rigidBody.wakeUp();
        handleC.rigidBody.wakeUp();
        const angleRangeDeg = 720;
        const rndAngleRad = MathUtils.degToRad(Math.random() * angleRangeDeg - angleRangeDeg/2);
        // const stiffness = Math.random() * 300 + 200;

        const stiffness = 200; // strength of the force that will be applied to make the bodies reach the target relative positions
        const damping = 0.9;   // strength of the force that will be applied to make the bodies reach the target relative velocities 

        // console.log('rndAngleRad', rndAngleRad);
        jointB.configureMotorPosition(rndAngleRad, stiffness, damping);
      }
    }

    loop.updatableBodies.push(jointA);
    loop.updatableBodies.push(jointB); 
  }

  createJoints();
}

export { pendulum };
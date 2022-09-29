import { MathUtils } from 'three';
import { JointData, RevoluteImpulseJoint } from '@dimforge/rapier3d-compat';
import { handle } from './handle';

const pendulum = (
    materials,
    physicsWorld,
    scene,
    loop
  ) => {

  const objA = {
    size: {
      width: Math.random() * 1.6 + 0.6,
      height: Math.random() * 0.3 + 0.04,
      depth: Math.random() * 0.3 + 0.04
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
    }
  }

  const objB = {
    size: {
      width: Math.random() * 1.2 + 0.2,
      height: Math.random() * 0.6 + 0.05,
      depth: Math.random() * 0.6 + 0.05
    },
    translation : {
      x: 2,
      y: 0,
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
    }
  }

  const objC = {
    size: {
      width: Math.random() * 1.8 + 0.4,
      height: Math.random() * 0.6 + 0.04,
      depth: Math.random() * 0.6 + 0.04
    },
    translation : {
      x: 4,
      y: 0,
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
    }
  }

  const handleA = handle(materials[0], objA, physicsWorld);
  scene.add(handleA.mesh);
  loop.bodies.push(handleA);

  const handleB = handle(materials[1], objB, physicsWorld);
  scene.add(handleB.mesh);
  loop.bodies.push(handleB);

  const handleC = handle(materials[2], objC, physicsWorld);
  scene.add(handleC.mesh);
  loop.bodies.push(handleC);

  let x = { x: 0.0, y: 0.0, z: 1.0 };
  let paramsA = JointData.revolute(
    { 
      x: objA.size.width/2 - objA.size.height/2,
      y: 0.0,
      z: 0.0
    },
    { 
      x: -objB.size.width/2 + objB.size.height/2,
      y: 0.0,
      z: objA.size.depth/2 + objB.size.depth/2
    },
    x
  );
  let jointA = physicsWorld.createImpulseJoint(paramsA, handleA.rigidBody, handleB.rigidBody, true);

  let paramsB = JointData.revolute(
    {
      x: objB.size.width/2 - objB.size.height/2,
      y: 0.0,
      z: 0.0
    },
    {
      x: -objC.size.width/2 + objC.size.height/2,
      y: 0.0,
      z: objB.size.depth/2 + objC.size.depth/2
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
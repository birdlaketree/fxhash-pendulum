import { MathUtils } from 'three';
import { JointData } from '@dimforge/rapier3d-compat';

export const createJoints = (
    handleComposition,
    loop,
    physicsWorld,
    handleA,
    handleB,
    handleC
  ) => {

  let hAConfXOffset = handleComposition.a.size.height/2;
  if (handleComposition.a.size.height >= handleComposition.a.size.width) {
    hAConfXOffset = handleComposition.a.size.width/2;
  };

  let hBConfXOffset = handleComposition.b.size.height/2;
  if (handleComposition.b.size.height >= handleComposition.b.size.width) {
    hBConfXOffset = handleComposition.b.size.width/2;
  };

  let hCConfXOffset = handleComposition.c.size.height/2;
  if (handleComposition.c.size.height >= handleComposition.c.size.width) {
    hCConfXOffset = handleComposition.c.size.width/2;
  };

  let x = { x: 0.0, y: 0.0, z: 1.0 };
  let paramsA = JointData.revolute(
    { 
      x: handleComposition.a.size.width/2 - hAConfXOffset,
      y: 0.0,
      z: -handleComposition.a.size.depth/2
    },
    { 
      x: -handleComposition.b.size.width/2 + hBConfXOffset,
      y: 0.0,
      z: handleComposition.b.size.depth/2
    },
    x
  );
  let jointA = physicsWorld.createImpulseJoint(paramsA, handleA.rigidBody, handleB.rigidBody, false);

  let paramsB = JointData.revolute(
    {
      x: handleComposition.b.size.width/2 - hBConfXOffset,
      y: 0.0,
      z: -handleComposition.b.size.depth/2
    },
    {
      x: -handleComposition.c.size.width/2 + hCConfXOffset,
      y: 0.0,
      z: handleComposition.c.size.depth/2
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
      const stiffness = Math.random() * 200 + (100 * handleComposition.a.volume * handleComposition.b.volume); // strength of the force that will be applied to make the bodies reach the target relative positions
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
      const stiffness = Math.random() * 200 + (100 * handleComposition.b.volume * handleComposition.c.volume); // strength of the force that will be applied to make the bodies reach the target relative positions
      const damping   = Math.random() * 0.6 + 0.3;   // strength of the force that will be applied to make the bodies reach the target relative velocities 
      jointB.configureMotorPosition(rndAngleRad, stiffness, damping);
    }
  }

  loop.updatableBodies.push(jointA);
  loop.updatableBodies.push(jointB); 
}
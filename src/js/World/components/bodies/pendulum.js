import { JointData } from '@dimforge/rapier3d-compat';
import { handle } from './handle';

const pendulum = (
    materials,
    physicsWorld,
    scene,
    loop
  ) => {

  const objA = {
    size: {
      width: 1.2,
      height: 0.2,
      depth: 0.2
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
      width: 1.2,
      height: 0.2,
      depth: 0.2
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
      width: 1.2,
      height: 0.2,
      depth: 0.2
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
  // loop.updatableBodies.push(handleA.rigidBody);

  const handleB = handle(materials[1], objB, physicsWorld);
  scene.add(handleB.mesh);
  loop.bodies.push(handleB);
  loop.updatableBodies.push(handleB.rigidBody);

  const handleC = handle(materials[2], objC, physicsWorld);
  scene.add(handleC.mesh);
  loop.bodies.push(handleC);
  // loop.updatableBodies.push(handleC.rigidBody);

  let x = { x: 0.0, y: 0.0, z: 1.0 };
  let paramsA = JointData.revolute({ x: 0.6 - 0.1, y: 0.0, z: 0.0 }, { x: -0.6 - 0.1, y: 0.0, z: 0.201 }, x);
  let jointA = physicsWorld.createImpulseJoint(paramsA, handleA.rigidBody, handleB.rigidBody, true);

  let paramsB = JointData.revolute({ x: 0.6 - 0.1, y: 0.0, z: 0.0 }, { x: -0.6 - 0.1, y: 0.0, z: 0.201 }, x);
  let jointB = physicsWorld.createImpulseJoint(paramsB, handleB.rigidBody, handleC.rigidBody, true);
}

export { pendulum };
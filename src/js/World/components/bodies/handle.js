import { BoxGeometry, Mesh, Quaternion, Euler, Group } from 'three';
import {
  RigidBodyDesc,
  ColliderDesc
} from '@dimforge/rapier3d-compat';

const handle = (
    material,
    obj,
    physicsWorld,
    widthSegments = 1,
    heightSegments = 1,
    depthSegments = 1
  ) => {

  const geometry = new BoxGeometry(
    obj.size.width,
    obj.size.height,
    obj.size.depth,
    widthSegments,
    heightSegments,
    depthSegments
  );
  const mesh = new Mesh(geometry, material);
  mesh.position.x = obj.anchor.x;
  mesh.position.y = obj.anchor.y;
  mesh.position.z = obj.anchor.z;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const group = new Group();
  group.add(mesh);

  const rigidBodyDesc = RigidBodyDesc.dynamic();
  rigidBodyDesc.setTranslation(obj.translation.x, obj.translation.y, obj.translation.z);
  const q = new Quaternion().setFromEuler(
    new Euler(obj.rotation.x, obj.rotation.y, obj.rotation.z, 'XYZ')
  )
  rigidBodyDesc.setRotation({x: q.x, y: q.y, z: q.z, w: q.w});

  const rigidBody = physicsWorld.createRigidBody(rigidBodyDesc);
  const collider = ColliderDesc.cuboid(obj.size.width / 2, obj.size.height / 2, obj.size.depth / 2)
    .setRestitution(0.7)
    .setTranslation(
        obj.anchor.x,
        obj.anchor.y,
        obj.anchor.z
      );

  physicsWorld.createCollider(collider, rigidBody);

  // add in loop.updatableBodies to trigger
  // rigidBody.tick = (delta) => {
  //   const treshold = Math.random();
  //   const impulseRange = 1.4;
  //   if (treshold < 0.02) {
  //     rigidBody.applyTorqueImpulse({
  //       x: 0,
  //       y: 0,
  //       z: Math.random() * impulseRange - impulseRange/2,
  //     }, true);
  //   }
  // };

  return {
    mesh: group,
    collider: collider,
    rigidBody: rigidBody
  };
}

export { handle };
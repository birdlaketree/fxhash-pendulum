import { Clock } from 'three';
import { Quaternion } from "three";

class Loop {
  constructor(camera, scene, renderer, stats) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.stats = stats;
    this.bodies = []
    this.kinematicPositionBasedBodies = []
    this.updatableBodies = [];
    this.clock = new Clock();
    this.physicsWorld = undefined;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // update stats
      // this.stats.update();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  setPhysics(physicsWorld) {
    this.physicsWorld = physicsWorld;
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = this.clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatableBodies) {
      object.tick(delta);
    }

    
    if (this.physicsWorld && this.bodies.length > 0) {
      this.physicsWorld.step();

      this.bodies.forEach(body => {
        const position = body.rigidBody.translation();
        const rotation = body.rigidBody.rotation();

        body.mesh.position.x = position.x;
        body.mesh.position.y = position.y;
        body.mesh.position.z = position.z;

        body.mesh.setRotationFromQuaternion(
          new Quaternion(
            rotation.x,
            rotation.y,
            rotation.z,
            rotation.w
          ));
      });

      this.kinematicPositionBasedBodies.forEach(body => {
        const position = body.mesh.position;
        const rotation = body.mesh.rotation;

        const quaternion = new Quaternion();
        quaternion.setFromEuler(rotation);

        body.rigidBody.setNextKinematicTranslation(position);
        body.rigidBody.setNextKinematicRotation(quaternion);
        // body.rigidBody.setTranslation(position, true);
        // body.rigidBody.setRotation(quaternion, true);
      });

    }
  }
}

export { Loop };

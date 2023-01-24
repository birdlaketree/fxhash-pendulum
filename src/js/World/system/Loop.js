import { Clock, Quaternion, Vector2 } from 'three';

class Loop {
  constructor(camera, scene, renderer, composer = null, stats, orbitControls, doPostprocessing) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.stats = stats;
    this.orbitControls = orbitControls;
    this.bodies = []
    this.kinematicPositionBasedBodies = []
    this.updatableBodies = [];
    this.clock = new Clock();
    this.physicsWorld = undefined;
    this.composer = composer;
    this.doPostprocessing = doPostprocessing;
    this.runPhysics = true;
    document.addEventListener('keypress', this.togglePhysicsEngine);
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      if (this.runPhysics) this.tick();

      this.stats.update();
      this.orbitControls.update();

      if (this.doPostprocessing) {
        this.composer.render();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  setPhysics(physicsWorld) {
    this.physicsWorld = physicsWorld;
  }

  togglePhysicsEngine = (e) => {
    if (e.code === 'KeyR') {
      if (this.runPhysics === true) {
        this.runPhysics = false;
      } else {
        this.runPhysics = true;
      }
    }
  }

  updateComposer = (composer) => {
    this.composer = composer;
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
        
        if (body.mesh.name === 'handle') {
          const n = new Vector2(0, 0);
          const b = new Vector2(position.x, position.z);
          // console.log('distance:', n.distanceTo(b));

          if (n.distanceTo(b) > 18) {
            // push it back to the center
            body.rigidBody.applyImpulse({ x: -position.x/4, y: 0, z: -position.z/4 }, true);
            console.log('+++ kick it back !!!');
          }
        }
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

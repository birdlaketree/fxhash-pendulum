import Stats from 'three/examples/jsm/libs/stats.module';
import RAPIER from '@dimforge/rapier3d-compat';
import { World as RWorld } from '@dimforge/rapier3d-compat';
import { Vector3 } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/stage/scene.js';
import { createCamera, createDolly } from './components/stage/camera.js';
import { createLights } from './components/stage/lights.js';
import { VrControls } from './system/VrControls.js';
import { createHandsPhysicsController } from "./system/handsPhysicsController.js";
import { room as roomPhysicsComposition } from './components/bodies/room.js';
import { roomWalls } from './components/meshes/roomWalls.js'
import { pendulum } from "./components/bodies/pendulum/pendulum.js";
import { spheres } from "./components/sceneFragments/spheres.js";
import { cubes } from "./components/sceneFragments/cubes.js";
import { materialTester } from './utils/materialTester'

class World {
  constructor() {
    this.xrEnabled = false;
    this.isDay = Math.round(Math.random());

    this.renderer = createRenderer(this.xrEnabled);
    this.scene = createScene(this.renderer, this.isDay);
    this.camera = createCamera();
    this.lights = createLights(this.scene);

    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    this.loop = new Loop(this.camera, this.scene, this.renderer, this.stats);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI/2 - Math.PI/32;
    this.controls.minPolarAngle = 0;
    this.controls.maxDistance = 40;
    this.controls.minDistance = 2;

    this.dolly = createDolly(this.camera, this.scene);
    this.dolly.position.set(0, 0, 0);

    this.vrControls = this.xrEnabled ? new VrControls(this.renderer, this.dolly, this.camera) : null;
    this.xrEnabled ? this.loop.updatableBodies.push(this.vrControls) : null;

    this.floorSize = 300;

    RAPIER.init().then(() => {
      this.physicsConfig();
      this.buildScene();
    });
  }

  physicsConfig() {
    const gravity = new Vector3(0.0, -9.81, 0.0);
    this.physicsWorld = new RWorld(gravity);
    this.loop.setPhysics(this.physicsWorld);
    this.room = roomPhysicsComposition(this.physicsWorld, this.floorSize, false);
    this.handsPhysicsController = this.xrEnabled ? createHandsPhysicsController(this.scene, this.loop, this.physicsWorld, this.vrControls) : null;
  }

  buildScene() {
    // this.materialTester  = materialTester(this.scene);
    this.walls           = roomWalls(this.scene, this.floorSize, this.isDay);
    this.pendulum        = pendulum (this.scene, this.loop, this.physicsWorld);
    this.spheresFragment = spheres  (this.scene, this.loop, this.physicsWorld, this.isDay);
    this.cubesFragment   = cubes    (this.scene, this.loop, this.physicsWorld, this.isDay);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };
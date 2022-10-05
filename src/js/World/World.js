import { Vector3, PlaneGeometry, MathUtils, Mesh } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/stage/scene.js';
import { createCamera, createDolly } from './components/stage/camera.js';
import { createLights } from './components/stage/lights.js';
import { VrControls } from './system/VrControls.js';
import { createHandsPhysicsController } from "./system/handsPhysicsController.js";
import RAPIER from '@dimforge/rapier3d-compat';
import { World as RWorld } from '@dimforge/rapier3d-compat';
import { room as roomPhysicsComposition } from './components/bodies/room.js';
import { roomWalls } from './components/meshes/roomWalls.js'
import { pendulum } from "./components/bodies/pendulum/pendulum.js";
import { spheres } from "./components/sceneFragments/spheres.js";
import { cubes } from "./components/sceneFragments/cubes.js";
// import { defaultColorWithNoise } from "./components/materials/defaultColorWithNoise";

class World {
  constructor() {
    this.isDay = Math.round(Math.random());
    // this.isDay = 1;
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer, this.isDay);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.dolly = createDolly(this.camera, this.scene);
    this.dolly.position.set(0, 0, 0);
    this.vrControls = new VrControls(this.renderer, this.dolly, this.camera);
    this.loop.updatableBodies.push(this.vrControls);
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
    // this.handsPhysicsController = createHandsPhysicsController(this.scene, this.physicsWorld, this.vrControls);
  }

  buildScene() {
    // const planeMaterial = defaultColorWithNoise(0xffffff, 1);
    // const planeGeom = new PlaneGeometry(2, 2, 4, 4);
    // const plane = new Mesh( planeGeom, planeMaterial );
    // plane.rotation.y = MathUtils.degToRad(35);
    // plane.rotation.x = MathUtils.degToRad(-55);
    // plane.position.x = -2;
    // plane.position.y = 2;
    // plane.position.z = -2;
    // this.scene.add(plane);

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
import RAPIER from '@dimforge/rapier3d-compat'
import { World as RWorld } from '@dimforge/rapier3d-compat'
import { orbitControls } from './utils/orbitControls'
import { stats } from './utils/stats'
import { Vector3, PMREMGenerator } from "three"
import { Loop } from './system/Loop.js'
import { createRenderer } from './system/renderer.js'
import { createScene } from './components/stage/scene.js'
import { createCamera, createDolly } from './components/stage/camera.js'
import { createLights } from './components/stage/lights.js'
import { VrControls } from './system/VrControls.js'
import { createHandsPhysicsController } from "./system/handsPhysicsController.js"
import { room as roomPhysicsComposition } from './components/bodies/room.js'
import { walls } from './components/meshes/walls.js'
import { pendulum } from "./components/bodies/pendulum/pendulum.js"
import { spheres } from "./components/sceneFragments/spheres.js"
import { cubes } from "./components/sceneFragments/cubes.js"
import { colorComposer } from './components/bodies/pendulum/colorComposer.js'
import { RoomEnvironment } from './components/stage/RoomEnv'
import { setPrintTools } from './utils/setPrintTools'
import { ssao as postprocessing } from './components/effects/ssao'
import { materialTester } from './utils/materialTester'
import { lightTester } from './utils/lightTester'

class World {
  constructor() {
    this.xrEnabled = false;
    this.doPostprocessing = true;

    this.colorCompositionID = Math.random();
    this.colorComposition = colorComposer(this.colorCompositionID);
    this.bgColor = this.colorComposition.bg.color;
    this.bgHSL = {};
    this.bgColor.getHSL(this.bgHSL);

    this.renderer = createRenderer(this.doPostprocessing, this.xrEnabled);
    this.scene = createScene();
    this.camera = createCamera();
    this.lights = createLights(this.scene);

    this.stats = stats();
    this.orbitControls = orbitControls(this.camera, this.renderer.domElement);
    this.composer = this.doPostprocessing ? postprocessing(this.camera, this.scene, this.renderer) : null;
    this.loop = new Loop(this.camera, this.scene, this.renderer, this.composer, this.stats, this.orbitControls, this.doPostprocessing);

    this.dolly = createDolly(this.camera, this.scene);
    this.vrControls = this.xrEnabled ? new VrControls(this.renderer, this.dolly, this.camera) : null;
    this.xrEnabled ? this.loop.updatableBodies.push(this.vrControls) : null;

    this.floorSize = 300;
    setPrintTools(this.renderer, this.scene, this.camera);
    

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
    const pmremGenerator = new PMREMGenerator(this.renderer);
    const envMap = pmremGenerator.fromScene(new RoomEnvironment(), 0.001).texture;
    // const envMap = null;

    // this.materialTester      = materialTester(this.scene, envMap);
    // this.lightTester         = lightTester(this.scene, envMap);
    this.walls               = walls    (this.scene, this.floorSize, this.bgHSL, this.bgColor);
    this.pendulum            = pendulum (this.scene, this.loop, this.physicsWorld, envMap, this.colorComposition);
    this.spheresFragment     = spheres  (this.scene, this.loop, this.physicsWorld, envMap, this.bgHSL, {min: 0.02,  sizeRange: Math.random()/20, n: 6, y: 0.2, yRange: 3});
    this.cubesFragment       = cubes    (this.scene, this.loop, this.physicsWorld, envMap, this.bgHSL, {min: 0.05,  sizeRange: 0.10, n: 8 , y: 0.2,  yRange: 2});
    this.miniCubesFragment   = cubes    (this.scene, this.loop, this.physicsWorld, envMap, this.bgHSL, {min: 0.006, sizeRange: 0.04, n: 48, y: 0.06, yRange: 2});
    this.orbitControls.target = this.pendulum.handleB.mesh.position;
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };
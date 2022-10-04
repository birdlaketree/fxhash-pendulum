import { Vector3 } from "three";
import { createColor } from "./utils/createColor.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/stage/scene.js';
import { createCamera, createDolly } from './components/stage/camera.js';
import { createLights } from './components/stage/lights.js';
import { VrControls } from './system/VrControls.js';
import { createHandsPhysicsController } from "./system/handsPhysicsController.js";
import { sphere } from './components/bodies/sphere.js';
import { cube } from "./components/bodies/cube";
import { pendulum } from "./components/bodies/pendulum.js";
import RAPIER from '@dimforge/rapier3d-compat';
import { World as RWorld } from '@dimforge/rapier3d-compat';
import { roomComposition } from './components/bodies/room.js';
import { createWalls } from './components/meshes/walls.js'
import { defaultColorMattPlastic } from "./components/materials/defaultColorMattPlastic.js";
import { defaultColorShinyPlastic } from "./components/materials/defaultColorShinyPlastic.js";

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const dolly = createDolly(this.camera, this.scene);
    dolly.position.set(0, 0, 0);
    this.vrControls = new VrControls(this.renderer, dolly, this.camera);
    this.loop.updatableBodies.push(this.vrControls);
    this.floorSize = 300;
    RAPIER.init().then(() => this.physicsStart());
  }

  physicsStart() {
    console.log('fx.physicsStart.2');
    const gravity = new Vector3(0.0, -9.81, 0.0);
    this.physicsWorld = new RWorld(gravity);
    // console.log('RAPIER', RAPIER);
    // console.log('this.physicsWorld', this.physicsWorld);
    this.loop.setPhysics(this.physicsWorld);
    this.room = roomComposition(this.physicsWorld, this.floorSize, false);
    this.buildScene();
  }

  buildScene() {
    console.log('fx.buildScene.2');
    this.walls = createWalls(this.scene, this.floorSize);
    // this.handsPhysicsController = createHandsPhysicsController(this.scene, this.physicsWorld, this.vrControls);
    const spreadWidth = 10;

    // pendulum

    const envMapIntensity = 0.4;
    const wMaterial = defaultColorMattPlastic(createColor(Math.random(), 1, 0), envMapIntensity - 0.2);
    const bMaterial = defaultColorMattPlastic(createColor(Math.random(), Math.random() * 0.3 + 0.7 , Math.random() * 0.8 + 0.04), envMapIntensity);
    const cMaterial = defaultColorMattPlastic(createColor(Math.random(), 1, 1), envMapIntensity - 0.1);
    const pItem = pendulum([wMaterial, bMaterial, cMaterial], this.physicsWorld, this.scene, this.loop);

    // spheres

    const colorMaterial = defaultColorShinyPlastic(createColor(0.6, 0.9, 0.001));
    for (let i = 0; i < 8; i++) {
      const size = {
        radius: Math.random()/12 + 0.02
      }
      const translation = {
        x: Math.random() * spreadWidth - spreadWidth/2,
        y: Math.random() * 6 + 3,
        z: Math.random() * spreadWidth - spreadWidth/2
      }
      const rotation = {
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
      }
      const sphereItem = sphere(colorMaterial, size, translation, rotation, this.physicsWorld);
      this.scene.add(sphereItem.mesh);
      this.loop.bodies.push(sphereItem);
    }

    // black cubes

    const blackMaterial = defaultColorShinyPlastic(createColor(0.6, 0, 0.02));
    for (let i = 0; i < 12; i++) {
      const size = {
        width:  Math.random() * 0.2 + 0.05,
        height: Math.random() * 0.2 + 0.05,
        depth:  Math.random() * 0.2 + 0.05
      }
      const translation = {
        x: Math.random() * spreadWidth - spreadWidth/2,
        y: Math.random() * 6 + 3,
        z: Math.random() * spreadWidth - spreadWidth/2
      }
      const rotation = {
        x: Math.random(),
        y: Math.random(),
        z: Math.random()
      }
      const cubeItem = cube(blackMaterial, size, translation, rotation, this.physicsWorld);
      this.scene.add(cubeItem.mesh);
      this.loop.bodies.push(cubeItem);
    }

    // black cube

    // for (let i = 0; i < 2; i++) {
    //   const size = {
    //     width:  Math.random() * 1 + 0.4,
    //     height: Math.random() * 1 + 0.4,
    //     depth:  Math.random() * 1 + 0.4
    //   }
    //   const translation = {
    //     x: Math.random() * spreadWidth - spreadWidth/2,
    //     y: Math.random() * 6 + 3,
    //     z: Math.random() * spreadWidth - spreadWidth/2
    //   }
    //   const rotation = {
    //     x: Math.random(),
    //     y: Math.random(),
    //     z: Math.random()
    //   }
    //   const cubeItem = cube(blackMaterial, size, translation, rotation, this.physicsWorld);
    //   this.scene.add(cubeItem.mesh);
    //   this.loop.bodies.push(cubeItem);
    // }
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };
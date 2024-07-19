## authonomy

In Authonomy I explore one of the basic behaviors of life —continual change. In this example, the entity is represented as a derivative of a double pendulum (also known as a chaotic pendulum). The entity’s movement is a result of a rotation impulse applied at both joints with a random period. The environment also has a function of change represented as a variable gravity.

The work is made with three.js and Rapier — a fast game/physics engine made with Rust programming language. All textures, normal and light maps are created dynamically using Canvas. This work is best viewed at 4k & 120Hz or better display.

[Authonomy](https://vedrankolac.github.io/authonomy/)


### Boilerplate
Boilerplate for a fast start with three.js materials in rapier physics engine on Oculus Quest 2 VR headset.
- only tested on Oculus Quest 2
- movement is controlled with joystick

### Quick start
```
npm i
npm start
````

#### GitHub Page
https://birdlaketree.github.io/rapier-boilerplate/

### How to deploy for github pages
```bash
rm -r build
npm run build
npm run deploy
```

### How to inspect in immersive mode
- Open Oculus Developer Hub (it automatically runs ADB and you can use it over WiFi)
- Use Oculus browser to run content (not tested with Firefox Reality)
- Use Chrome to debug `chrome://inspect/#devices`

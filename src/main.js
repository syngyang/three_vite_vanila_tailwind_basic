import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class Environment {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.domApp = document.querySelector("#app");
    this.domApp.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.setupCamera();
    this.setupLight();
    this.setupControls();
    this.setupModels();
    this.setupEvents();
    this.resize();
    console.log("hi three.js");
  }
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75, 
      this.domApp.clientWidth / this.domApp.clientHeight, 
      0.1, 
      100
    );
    this.camera.position.z = 5;
  }

  setupLight() {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
 
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 32, 64);

    this.scene.add(light);
  }

  setupModels() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    // const material = new THREE.MeshPhongMaterial({color:0x44aa88})
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  setupControls() {
    this.orbitControls = new OrbitControls(this.camera, this.domApp);
  }

  setupEvents() {
    window.onresize = this.resize.bind(this);
    // this.resize() 도 가능하지만, constructor에 넣었음
    // this.clock = new THREE.Clock() // clock의 델타 값을 이용하려면 먼저
    this.renderer.setAnimationLoop(this.render.bind(this));
  }
  resize() {
    const { clientWidth: width, clientHeight: height } = this.domApp
    // const width = this.domApp.clientWidth;
    // const height = this.domApp.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  update(time) {
   this.cube.rotation.y = time * 0.001;// ms -> s
    
   this.orbitControls.update();
  }

  render(time) {
    this.update(time);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
  
}

new Environment();

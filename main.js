import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as RAPIER from '@dimforge/rapier3d-compat';

let scene, camera, renderer, starfield, world;

export async function init() {
    // Physics
    await RAPIER.init();
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    world = new RAPIER.World(gravity);

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Starfield
    createStarfield();

    // Animation Loop
    renderer.setAnimationLoop(animate);

    console.log('Valentine Card Initialized');
}

function createStarfield() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 10000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0x888888 });

    starfield = new THREE.Points(geometry, material);
    scene.add(starfield);
}

function animate() {
    if (world) {
        world.step();
    }
    if (starfield) {
        starfield.rotation.y += 0.0005;
    }
    renderer.render(scene, camera);
}
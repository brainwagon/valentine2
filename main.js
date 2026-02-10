import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import * as RAPIER from '@dimforge/rapier3d-compat';

let scene, camera, renderer, starfield, world, spawnInterval, raycaster, composer;
const mouse = new THREE.Vector2();
const hearts = new Map(); // Map Three.js mesh to Rapier rigid body
const sparkles = [];

export async function init() {
    // Reset state
    hearts.clear();
    sparkles.length = 0;
    if (spawnInterval) clearInterval(spawnInterval);

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

    // Post-processing
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
    );
    composer.addPass(bloomPass);

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

    // Platform
    createPlatform();

    // Heart Spawning
    spawnInterval = setInterval(spawnHeart, 1000);

    // Interaction
    raycaster = new THREE.Raycaster();
    window.addEventListener('click', onClick);

    // Animation Loop
    renderer.setAnimationLoop(animate);

    console.log('Valentine Card Initialized');
}

function createStarfield() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 10000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(2000));
        vertices.push(THREE.MathUtils.randFloatSpread(2000));
        vertices.push(THREE.MathUtils.randFloatSpread(2000));
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x888888, size: 0.7 });
    starfield = new THREE.Points(geometry, material);
    scene.add(starfield);
}

function createPlatform() {
    const size = 5;
    const thickness = 0.5;
    const geometry = new THREE.BoxGeometry(size, thickness, size);
    const material = new THREE.MeshStandardMaterial({ color: 0xffaaaa });
    const platformMesh = new THREE.Mesh(geometry, material);
    scene.add(platformMesh);

    const rigidBodyDesc = RAPIER.RigidBodyDesc.fixed();
    const rigidBody = world.createRigidBody(rigidBodyDesc);
    const colliderDesc = RAPIER.ColliderDesc.cuboid(size / 2, thickness / 2, size / 2);
    world.createCollider(colliderDesc, rigidBody);
}

function createHeartShape() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
    shape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
    shape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
    shape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
    return shape;
}

function spawnHeart() {
    const x = THREE.MathUtils.randFloatSpread(4);
    const y = 10;
    const z = THREE.MathUtils.randFloatSpread(4);

    // Random initial orientation
    const randRot = new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    const quaternion = new THREE.Quaternion().setFromEuler(randRot);

    const shape = createHeartShape();
    const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    
    const colors = [0xffb7b2, 0xffdac1, 0xe2f0cb, 0xb5ead7, 0xc7ceea];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const material = new THREE.MeshStandardMaterial({ color: color });
    
    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.position.set(x, y, z);
    heartMesh.quaternion.copy(quaternion);
    scene.add(heartMesh);

    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(x, y, z)
        .setRotation({ x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w });
    const rigidBody = world.createRigidBody(rigidBodyDesc);

    // Increased ball radius to 0.6 to better encompass the heart's vertices and prevent penetration
    const colliderDesc = RAPIER.ColliderDesc.ball(0.6).setRestitution(0.7).setFriction(0.5);
    world.createCollider(colliderDesc, rigidBody);

    hearts.set(heartMesh, rigidBody);
}

function onClick(event) {
    if (!raycaster) return;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Array.from(hearts.keys()));

    if (intersects.length > 0) {
        createSparkles(intersects[0].point);
    }
}

function createSparkles(position) {
    const particleCount = 20;
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        vertices.push(position.x, position.y, position.z);
        velocities.push(
            THREE.MathUtils.randFloatSpread(0.2),
            THREE.MathUtils.randFloatSpread(0.2),
            THREE.MathUtils.randFloatSpread(0.2)
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({
        color: 0xffffaa,
        size: 0.1,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    sparkles.push({
        mesh: points,
        velocities: velocities,
        life: 1.0
    });
}

function animate() {
    if (world) {
        world.step();
    }

    // Sync Hearts
    for (const [mesh, body] of hearts.entries()) {
        const translation = body.translation();
        if (translation.y < -10) {
            scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
            world.removeRigidBody(body);
            hearts.delete(mesh);
        } else {
            const rotation = body.rotation();
            mesh.position.set(translation.x, translation.y, translation.z);
            mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
        }
    }

    // Update Sparkles
    for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life -= 0.02;
        if (s.life <= 0) {
            scene.remove(s.mesh);
            s.mesh.geometry.dispose();
            s.mesh.material.dispose();
            sparkles.splice(i, 1);
        } else {
            const positions = s.mesh.geometry.attributes.position.array;
            for (let j = 0; j < s.velocities.length; j += 3) {
                positions[j] += s.velocities[j];
                positions[j+1] += s.velocities[j+1];
                positions[j+2] += s.velocities[j+2];
            }
            s.mesh.geometry.attributes.position.needsUpdate = true;
            s.mesh.material.opacity = s.life;
        }
    }

    if (starfield) {
        starfield.rotation.y += 0.0005;
    }
    
    if (composer) {
        composer.render();
    } else if (renderer) {
        renderer.render(scene, camera);
    }
}

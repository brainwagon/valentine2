import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import * as RAPIER from '@dimforge/rapier3d-compat';

let scene, camera, renderer, starfield, world, eventQueue, spawnInterval, raycaster, composer;
let listener, ambientMusic;
const mouse = new THREE.Vector2();
const hearts = new Map(); // Map Three.js mesh to Rapier rigid body
const sparkles = [];

export function createLabelTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (!context) return new THREE.CanvasTexture(canvas);

    // Transparent background
    context.clearRect(0, 0, canvas.width, canvas.height);

    const lines = text.split(' ');
    const isSingleLine = lines.length === 1;

    // Text settings
    let fontSize = 60;
    if (isSingleLine) {
        fontSize *= 1.2;
    }

    context.font = `bold ${fontSize}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#8b0000'; // Deep red

    const lineHeight = fontSize * 1.1;
    const totalHeight = lines.length * lineHeight;
    
    // Start Y such that the block is centered vertically
    let currentY = (canvas.height - totalHeight) / 2 + lineHeight / 2;

    if (isSingleLine) {
        // Move up by 8% of canvas height
        currentY -= canvas.height * 0.08;
    }

    lines.forEach(line => {
        context.fillText(line, canvas.width / 2, currentY);
        currentY += lineHeight;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
}

export async function init() {
    // Reset state
    hearts.clear();
    sparkles.length = 0;
    if (spawnInterval) clearTimeout(spawnInterval);

    // Physics
    await RAPIER.init();
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    world = new RAPIER.World(gravity);
    eventQueue = new RAPIER.EventQueue(true);

    // Scene
    scene = new THREE.Scene();
    scene.background = createGradientTexture();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Audio
    listener = new THREE.AudioListener();
    camera.add(listener);
    initAudio();

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
        1.2,
        0.4,
        0.85
    );
    composer.addPass(bloomPass);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Starfield
    createStarfield();

    // Platform
    createPlatform();

    // Heart Spawning
    scheduleNextSpawn();

    // Interaction
    raycaster = new THREE.Raycaster();
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onWindowResize);

    // Audio controls
    const playPauseBtn = document.getElementById('play-pause-button');
    const rewindBtn = document.getElementById('rewind-button');
    const stopBtn = document.getElementById('stop-button');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    if (playPauseBtn && rewindBtn && stopBtn) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!ambientMusic || !ambientMusic.buffer) return;

            if (listener && listener.context.state === 'suspended') {
                listener.context.resume();
            }

            if (ambientMusic.isPlaying) {
                ambientMusic.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else {
                ambientMusic.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
        });

        rewindBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!ambientMusic || !ambientMusic.buffer) return;
            
            const wasPlaying = ambientMusic.isPlaying;
            ambientMusic.stop();
            if (wasPlaying) {
                ambientMusic.play();
            }
        });

        stopBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!ambientMusic || !ambientMusic.buffer) return;

            ambientMusic.stop();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        });
    }

    // Animation Loop
    renderer.setAnimationLoop(animate);

    console.log('Valentine Card Initialized');
}

function createGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    if (!context) return null;

    const gradient = context.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#00008B'); // Deep blue
    gradient.addColorStop(1, '#000005'); // Almost black
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 2, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function initAudio() {
    const audioLoader = new THREE.AudioLoader();
    
    ambientMusic = new THREE.Audio(listener);
    // Use local mp3 file
    audioLoader.load('./what_a_wonderful_world.mp3', 
        (buffer) => {
            ambientMusic.setBuffer(buffer);
            ambientMusic.setLoop(false);
            ambientMusic.setVolume(0.5);
            
            // Handle end of song to update UI
            ambientMusic.onEnded = () => {
                const playIcon = document.getElementById('play-icon');
                const pauseIcon = document.getElementById('pause-icon');
                if (playIcon && pauseIcon) {
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }
            };
            
            console.log('Ambient music loaded');
        },
        undefined,
        (err) => console.error('Error loading ambient music:', err)
    );
}

function createStarfield() {
    const starShape = new THREE.Shape();
    const points = 5;
    const outerRadius = 6;
    const innerRadius = 2.4;
    const angleStep = (Math.PI * 2) / points;

    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * (angleStep / 2) - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) starShape.moveTo(x, y);
        else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const geometry = new THREE.ShapeGeometry(starShape);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Bright yellow
    const count = 500;
    starfield = new THREE.InstancedMesh(geometry, material, count);

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    starfield.userData.instanceData = [];

    const acceptedPositions = [];

    function getRandomSphericalPosition() {
        // Uniform distribution on a sphere surface
        const z = Math.random() * 2 - 1;
        const phi = Math.random() * Math.PI * 2;
        const r = Math.sqrt(1 - z * z);
        const x = r * Math.cos(phi);
        const y = r * Math.sin(phi);
        
        // Return a normalized vector (direction)
        return new THREE.Vector3(x, y, z);
    }

    const starRadius = 500;

    for (let i = 0; i < count; i++) {
        let bestDirection;
        if (i === 0) {
            bestDirection = getRandomSphericalPosition();
        } else {
            let minMaxDot = Infinity;
            const numCandidates = 10;
            for (let c = 0; c < numCandidates; c++) {
                const candidateDir = getRandomSphericalPosition();
                let maxDot = -Infinity;
                for (let j = 0; j < acceptedPositions.length; j++) {
                    const dot = candidateDir.dot(acceptedPositions[j]);
                    if (dot > maxDot) {
                        maxDot = dot;
                    }
                }
                // We want the candidate whose closest neighbor is as far as possible.
                // Closest neighbor = largest dot product.
                // We want to minimize this largest dot product.
                if (maxDot < minMaxDot) {
                    minMaxDot = maxDot;
                    bestDirection = candidateDir;
                }
            }
        }
        acceptedPositions.push(bestDirection);
        position.copy(bestDirection).multiplyScalar(starRadius);
        
        rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        quaternion.setFromEuler(rotation);
        
        const s = THREE.MathUtils.randFloat(0.5, 2.0);
        scale.set(s, s, s);

        matrix.compose(position, quaternion, scale);
        starfield.setMatrixAt(i, matrix);

        // Store individual rotation data
        starfield.userData.instanceData.push({
            position: position.clone(),
            quaternion: quaternion.clone(),
            scale: scale.clone(),
            axis: new THREE.Vector3(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ).normalize(),
            speed: THREE.MathUtils.randFloat(0.005, 0.02)
        });
    }

    starfield.userData.rotationAxis = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    ).normalize();

    scene.add(starfield);
}

function createPlatform() {
    const radius = 4;
    const thickness = 0.4;
    const segments = 32;
    const points = [];
    
    // Outer surface
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * (Math.PI / 2);
        points.push(new THREE.Vector2(radius * Math.sin(theta), -radius * Math.cos(theta)));
    }
    
    // Inner surface
    for (let i = segments; i >= 0; i--) {
        const theta = (i / segments) * (Math.PI / 2);
        points.push(new THREE.Vector2((radius - thickness) * Math.sin(theta), -(radius - thickness) * Math.cos(theta)));
    }

    const geometry = new THREE.LatheGeometry(points, 32);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xD4AF37, 
        metalness: 1.0, 
        roughness: 0.5
    });
    const platformMesh = new THREE.Mesh(geometry, material);
    platformMesh.position.y = -2;
    scene.add(platformMesh);

    const rigidBodyDesc = RAPIER.RigidBodyDesc.fixed()
        .setTranslation(0, -2, 0);
    const rigidBody = world.createRigidBody(rigidBodyDesc);
    
    const vertices = geometry.attributes.position.array;
    const indices = geometry.index.array;
    const colliderDesc = RAPIER.ColliderDesc.trimesh(vertices, indices)
        .setRestitution(0.8)
        .setFriction(0.5);
    world.createCollider(colliderDesc, rigidBody);
}

export function createHeartShape() {
    const shape = new THREE.Shape();
    // Oriented to point down
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, 0.3, -0.6, 0.3, -0.6, 0);
    shape.bezierCurveTo(-0.6, -0.3, -0.2, -1, 0, -1);
    shape.bezierCurveTo(0.2, -1, 0.6, -0.3, 0.6, 0);
    shape.bezierCurveTo(0.6, 0.3, 0, 0.3, 0, 0);
    return shape;
}

export function createHeartGeometry() {
    const shape = createHeartShape();
    const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
}

function scheduleNextSpawn() {
    const delay = THREE.MathUtils.randFloat(300, 700);
    spawnInterval = setTimeout(() => {
        spawnHeart();
        scheduleNextSpawn();
    }, delay);
}

function spawnHeart() {
    const x = THREE.MathUtils.randFloatSpread(4);
    const y = 10;
    const z = THREE.MathUtils.randFloatSpread(4);

    const randRot = new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    const quaternion = new THREE.Quaternion().setFromEuler(randRot);

    const geometry = createHeartGeometry();
    
    const colors = [0xffb7b2, 0xffdac1, 0xe2f0cb, 0xb5ead7, 0xc7ceea];
    const colorValue = colors[Math.floor(Math.random() * colors.length)];
    const material = new THREE.MeshStandardMaterial({ color: colorValue });
    
    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.position.set(x, y, z);
    heartMesh.quaternion.copy(quaternion);
    
    // Label on the front side
    const labels = [
        "M❤C", "C❤M", "KISS", "HUG", "I WUV U",
        "BE MINE", "KISS ME", "TRUE LOVE", "LOVE BUG",
        "SOUL MATE", "CUTIE PIE", "SWEET PEA", "HONEY PIE",
        "HUG ME", "WINK WINK", "#LOVE", "#4EVER"
    ];
    const randomLabel = labels[Math.floor(Math.random() * labels.length)];
    const labelTexture = createLabelTexture(randomLabel);
    const labelGeo = new THREE.PlaneGeometry(1.0, 1.0);
    const labelMat = new THREE.MeshBasicMaterial({ 
        map: labelTexture, 
        transparent: true,
        side: THREE.FrontSide
    });

    const labelFront = new THREE.Mesh(labelGeo, labelMat);
    // Extrude depth is 0.4. geometry.center() puts faces at +/- 0.2.
    // bevelThickness is 0.1. So front-most face is at z = 0.2 + 0.1 = 0.3.
    // Set position.z to 0.31 to be just outside.
    labelFront.position.z = 0.31;
    heartMesh.add(labelFront);

    scene.add(heartMesh);

    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(x, y, z)
        .setRotation({ x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w });
    const rigidBody = world.createRigidBody(rigidBodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.ball(0.7)
        .setRestitution(0.8)
        .setFriction(0.5);
    world.createCollider(colliderDesc, rigidBody);

    hearts.set(heartMesh, rigidBody);
}

function onClick(event) {
    if (!raycaster) return;

    if (listener && listener.context.state === 'suspended') {
        listener.context.resume();
    }
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Array.from(hearts.keys()));

    if (intersects.length > 0) {
        createSparkles(intersects[0].point);
    }
}

function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) {
        composer.setSize(window.innerWidth, window.innerHeight);
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

function disposeObject(obj) {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
        if (Array.isArray(obj.material)) {
            obj.material.forEach(m => {
                if (m.map) m.map.dispose();
                m.dispose();
            });
        } else {
            if (obj.material.map) obj.material.map.dispose();
            obj.material.dispose();
        }
    }
    if (obj.children) {
        obj.children.forEach(child => disposeObject(child));
    }
}

function animate() {
    if (world) {
        world.step(eventQueue);
        if (eventQueue) {
            // Collision events are no longer needed as sounds are removed
        }
    }

    // Sync Hearts
    for (const [mesh, body] of hearts.entries()) {
        const translation = body.translation();
        if (translation.y < -12) {
            scene.remove(mesh);
            disposeObject(mesh);
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
            disposeObject(s.mesh);
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

    if (starfield && starfield.userData.rotationAxis) {
        starfield.rotateOnAxis(starfield.userData.rotationAxis, 0.0005);
        
        // Update individual star rotations
        if (starfield.userData.instanceData) {
            const matrix = new THREE.Matrix4();
            const rotationQuat = new THREE.Quaternion();
            
            starfield.userData.instanceData.forEach((data, i) => {
                rotationQuat.setFromAxisAngle(data.axis, data.speed);
                data.quaternion.multiply(rotationQuat);
                
                matrix.compose(data.position, data.quaternion, data.scale);
                starfield.setMatrixAt(i, matrix);
            });
            starfield.instanceMatrix.needsUpdate = true;
        }
    }
    
    if (composer) {
        composer.render();
    } else if (renderer) {
        renderer.render(scene, camera);
    }
}
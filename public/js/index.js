import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Basic Setup
const container = document.getElementById('model-frame');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true });

camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0xe3e3e3);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
container.appendChild(renderer.domElement);

// Lighting
const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 20;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2.5;

// Raycasting Setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredObject = null;

// Descriptions
const objectDescriptions = {
    "Mesh_20002_1": "I am learning programming.",
    "Mesh_11001": "I used to be a med lab technologist.",
    "Roundcube001_1": "This is my cat @MrArthurKing, he is always by my side.",
    "Roundcube001_2": "This is my cat @MrArthurKing, he is always by my side."
};

// Tooltip
const tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.padding = "8px 12px";
tooltip.style.background = "rgba(189, 161, 161, 0.6)";
tooltip.style.color = "#000";
tooltip.style.borderRadius = "6px";
tooltip.style.display = "none";
tooltip.style.fontSize = "14px";
tooltip.style.pointerEvents = "none";
document.body.appendChild(tooltip);

// Load Models
const loader = new GLTFLoader();
const objects = [];
const models = ['cat.glb', 'chair.glb', 'table.glb', 'laptop.glb', 'beaker.glb'];

models.forEach((path) => {
    loader.load(path, (gltf) => {
        const model = gltf.scene;
        model.userData.name = path;
        scene.add(model);
        model.traverse((child) => {
            if (child.isMesh) {
                objects.push(child);
            }
        });
    });
});

// Handle Mouse Move for Hover
window.addEventListener("mousemove", (event) => {
    const rect = container.getBoundingClientRect(); 
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects, true);
    console.log("Hovered Objects:", intersects.length > 0 ? intersects[0].object : "None");

    if (intersects.length > 0) {
        hoveredObject = intersects[0].object;
        const objectName = hoveredObject.name;
        const description = objectDescriptions[objectName];
    
        if (description) {
            tooltip.innerHTML = description;
            tooltip.style.left = event.clientX + "px";
            tooltip.style.top = event.clientY + "px";
            tooltip.style.display = "block";
        }
    } else {
        tooltip.style.display = "none";
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

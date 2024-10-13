import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
const w=window.innerWidth;
const h=window.innerHeight;
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov=75;
const aspect=w/h;
const near=0.1;
const far=10;

const camera=new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z=3;


const scene=new THREE.Scene();


const control=new OrbitControls(camera,renderer.domElement);
control.enableDamping=true;
control.dampingFactor=0.03;

const geometry = new THREE.IcosahedronGeometry( 1, 10);
const material = new THREE.MeshStandardMaterial( { color: 0xffffff, flatShading:true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const wireMat=new THREE.MeshBasicMaterial({
    color: 0xffffff, wireframe:true

});
const wireMesh=new THREE.Mesh(geometry,wireMat);
wireMesh.scale.setScalar(1.001)
cube.add(wireMesh);

const hemilight=new THREE.HemisphereLight(0x0099ff,0xaa5500);
scene.add(hemilight); 

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let isMouseOver = false;

// Listen for mousemove event
document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Perform raycasting to check if mouse is over the mesh
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);
    
    // Check if the mouse is over the cube
    if (intersects.length > 0) {
        isMouseOver = true;
    } else {
        isMouseOver = false;
    }
}

function animate(t = 0) {
    requestAnimationFrame(animate);
    
    if (isMouseOver) {
        cube.rotation.x = (mouse.y) * Math.PI * 0.1;
        cube.rotation.y = (mouse.x) * Math.PI * 0.1;
    }

    renderer.render(scene, camera); 
    control.update();
}

animate();



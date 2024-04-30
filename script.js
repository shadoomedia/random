// Import Three.js and GLTFLoader
import * as THREE from "./node_modules/three";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";

const audioElement = document.getElementById("background-music");

// Function to play the audio
function playBackgroundMusic() {
  audioElement.play();
  audioElement.loop = true; // Set the loop property to true
}

// Function to pause the audio
function pauseBackgroundMusic() {
  audioElement.pause();
}

// Call the playBackgroundMusic function when the page loads
window.addEventListener("load", () => {
  playBackgroundMusic();
});

// Ensure Three.js and GLTFLoader are fully loaded
window.onload = function () {
  // Set up scene
  const scene = new THREE.Scene(); // Create a new Three.js scene
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  ); // Create a new camera with higher fov

  const renderer = new THREE.WebGLRenderer();
  // Add a directional light to the scene
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-6, 0, 1); // Set light position
  scene.add(light);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(6, 0, 1); // Set light position
  scene.add(light2);
  // Create a new WebGL renderer
  renderer.setSize(window.innerWidth, window.innerHeight); // Set initial renderer size
  document.body.appendChild(renderer.domElement); // Add renderer canvas element to the HTML document
  const parentObject = new THREE.Object3D();
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./public/models/Earth_Col_6K.png");

  const objects = [];

  // Load 3D model
  const loader = new GLTFLoader(); // Create a new GLTFLoader instance
  loader.load(
    "./public/models/model.glb", // Path to your 3D model file
    function (gltf) {
      // Called when the model is loaded
      const model = gltf.scene; // Store the loaded model
      model.scale.set(2, 2, 2);
      model.position.set(0, 9, 0);
      model.rotation.y = !Math.PI; // Optionally orient the model as needed
      scene.add(parentObject);
      scene.add(model); // Add the loaded model to the scene
      parentObject.add(model);
      objects.push(model);
    },
    undefined,
    function (error) {
      // Called if there's an error loading the model
      console.error("Error loading 3D model:", error);
    }
  );

  loader.load(
    "./public/models/model2.glb", // Path to your 3D model file
    function (gltf) {
      // Called when the model is loaded
      const model = gltf.scene; // Store the loaded model
      model.rotation.y = !Math.PI; // Optionally orient the model as needed
      model.position.set(-25, 0, 0);
      scene.add(model); // Add the loaded model to the scene
      objects.push(model);
    },
    undefined,
    function (error) {
      // Called if there's an error loading the model
      console.error("Error loading 3D model:", error);
    }
  );

  loader.load(
    "./public/models/model2.glb", // Path to your 3D model file
    function (gltf) {
      // Called when the model is loaded
      const model = gltf.scene; // Store the loaded model
      model.rotation.y = !Math.PI; // Optionally orient the model as needed
      model.position.set(25, 0, 0);
      scene.add(model); // Add the loaded model to the scene
      objects.push(model);
    },
    undefined,
    function (error) {
      // Called if there's an error loading the model
      console.error("Error loading 3D model:", error);
    }
  );

  loader.load(
    "./public/models/earth.glb",
    function (gltf) {
      const model = gltf.scene;
      model.rotation.y = Math.PI; // Corrected rotation value
      model.position.set(0, -32, 0);
      model.scale.set(50, 20, 20);

      // Apply the texture to the model
      model.traverse(function (child) {
        if (child.isMesh) {
          child.material.map = texture;
        }
      });

      scene.add(model);
      objects.push(model);
    },
    undefined,
    function (error) {
      console.error("Error loading 3D model:", error);
    }
  );

  // Set camera position
  camera.position.z = 20; // Set camera position along the z-axis

  // Function to handle window resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize);

  // Render loop
  function animate() {
    requestAnimationFrame(animate); // Request animation frame to continuously update the scene
    // Rotate the loaded model
    animateRainbow();
    objects[2].rotation.y += 0.1;
    objects[2].rotation.z += 0.02;
    objects[2].rotation.x += 0.15;
    objects[3].rotation.y -= 0.1;
    objects[3].rotation.z -= 0.02;
    objects[3].rotation.x += 0.15;
    objects[0].rotation.x -= 0.1075;
    parentObject.rotation.x += 0.1075;
    objects[1].rotation.x -= 0.01;

    // Adjust the rotation speed as needed
    renderer.render(scene, camera); // Render the scene with the camera
  }

  function animateRainbow() {
    const rainbowColors = [
      [255, 0, 0], // Red
      [255, 69, 0], // Red-Orange
      [255, 127, 0], // Orange
      [255, 165, 0], // Orange-Yellow
      [255, 215, 0], // Gold
      [255, 255, 0], // Yellow
      [218, 165, 32], // Goldenrod
      [255, 250, 205], // Lemon Chiffon
      [255, 239, 213], // Papaya Whip
      [255, 218, 185], // Peach
      [255, 192, 203], // Pink
      [255, 182, 193], // Light Pink
      [255, 105, 180], // Pink
      [255, 20, 147], // Deep Pink
      [255, 0, 255], // Magenta
      [255, 105, 180], // Pink
      [218, 112, 214], // Orchid
      [186, 85, 211], // Medium Orchid
      [153, 50, 204], // Dark Orchid
      [148, 0, 211], // Violet
      [138, 43, 226], // Blue-Violet
      [75, 0, 130], // Indigo
      [0, 0, 255], // Blue
      [0, 191, 255], // Sky Blue
      [30, 144, 255], // Dodger Blue
      [173, 216, 230], // Light Blue
      [0, 255, 255], // Cyan
      [0, 255, 127], // Green
      [0, 128, 0], // Green (Dark Green)
      [0, 100, 0], // Green (Dark Green)
      [0, 255, 0], // Lime Green
      [173, 255, 47], // Green-Yellow
      [0, 255, 0], // Green
      [124, 252, 0], // Lawn Green
      [144, 238, 144], // Light Green
      [152, 251, 152], // Pale Green
      [50, 205, 50], // Lime Green
      [0, 128, 128], // Teal
      [0, 139, 139], // Dark Cyan
      [0, 128, 128], // Teal
      [0, 0, 128], // Navy
      [0, 0, 139], // Dark Blue
      [25, 25, 112], // Midnight Blue
      [138, 43, 226], // Blue-Violet
      [106, 90, 205], // Slate Blue
      [72, 61, 139], // Dark Slate Blue
      [128, 0, 0], // Maroon
      [139, 0, 0], // Dark Red
      [165, 42, 42], // Brown
      [178, 34, 34], // Firebrick
      [205, 92, 92], // Indian Red
      [139, 69, 19], // Saddle Brown
      [160, 82, 45], // Sienna
      [210, 105, 30], // Chocolate
      [139, 69, 19], // Saddle Brown
      [205, 133, 63], // Peru
      [244, 164, 96], // Sandy Brown
      [210, 180, 140], // Tan
      [188, 143, 143], // Rosy Brown
      [255, 228, 181], // Moccasin
      [255, 255, 224], // Light Yellow
      [255, 250, 205], // Lemon Chiffon
      [240, 255, 240], // Honeydew
      [240, 255, 255], // Azure
      [240, 248, 255], // Alice Blue
      [248, 248, 255], // Ghost White
      [255, 250, 240], // Ivory
      [255, 255, 255], // White
      [0, 0, 0],
    ];

    const time = performance.now();
    const duration = 10000; // Duration of the color cycle in milliseconds

    // Calculate a value between 0 and 1 based on time and duration
    const t = (time % duration) / duration;

    // Calculate the indices of the two neighboring colors
    const index1 = Math.floor(t * (rainbowColors.length - 1));
    const index2 = (index1 + 1) % rainbowColors.length;

    // Interpolate between neighboring colors' RGB components
    const r = Math.round(
      (1 - t) * rainbowColors[index1][0] + t * rainbowColors[index2][0]
    );
    const g = Math.round(
      (1 - t) * rainbowColors[index1][1] + t * rainbowColors[index2][1]
    );
    const b = Math.round(
      (1 - t) * rainbowColors[index1][2] + t * rainbowColors[index2][2]
    );

    // Convert RGB values to hexadecimal
    const hex = rgbToHex(r, g, b);

    // Set scene background color
    scene.background = new THREE.Color(hex);
  }

  // Function to convert RGB values to hexadecimal
  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  animate(); // Start the render loop
};

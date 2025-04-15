import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

type Assists = {
  screenMesh: THREE.Mesh;
  computerMesh: THREE.Mesh;
  crtMesh: THREE.Mesh;
  keyboardMesh: THREE.Mesh;
  shadowPlaneMesh: THREE.Mesh;
  bakeTexture: THREE.Texture;
  bakeFloorTexture: THREE.Texture;
  publicPixelFont: Font;
  chillFont: Font;
  environmentMapTexture: THREE.CubeTexture;
};

function loadAssists(callback: (assists: Assists) => any) {
  const assists: any = {};

  const loadingDOM = document.querySelector("#loading");
  const loadingItemsDOM = document.querySelector("#loading-items");
  const loadingBarDOM = document.querySelector("#loading-bar-progress");

  const manager = new THREE.LoadingManager();

  // Get the base path (handle both development and production)
  const basePath = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
  console.log(`WebGL loading assets from base path: ${basePath}`);

  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onLoad = function () {
    if (!loadingItemsDOM) return;
    loadingItemsDOM.textContent = `Nearly There...`;

    console.log("Loading complete!");
    window.setTimeout(() => {
      (loadingDOM as any).style.opacity = "0";
      callback(assists as Assists);
    }, 200);
    window.setTimeout(() => {
      (loadingDOM as any).style.display = "none";
    }, 500);
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    if (!loadingItemsDOM || !loadingBarDOM) return;
    (loadingBarDOM as HTMLElement).style.transform = `scaleX(${
      itemsLoaded / itemsTotal
    })`;
    loadingItemsDOM.textContent = `${itemsLoaded} of ${itemsTotal} File Loaded: ${url}`;
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onError = function(url) {
    console.error(`Error loading WebGL asset: ${url}`);
    alert(`Failed to load 3D assets from ${url}. Please try refreshing the page.`);
  };

  // Fonts
  const fontLoader = new FontLoader(manager);
  fontLoader.load(`${basePath}fonts/public-pixel.json`, (font) => {
    assists.publicPixelFont = font;
  });
  fontLoader.load(`${basePath}fonts/chill.json`, (font) => {
    assists.chillFont = font;
  });

  // Texture
  const textureLoader = new THREE.TextureLoader(manager);
  textureLoader.load(`${basePath}textures/bake-quality-5.jpg`, (tex) => {
    tex.flipY = false;
    tex.encoding = THREE.sRGBEncoding;
    assists.bakeTexture = tex;
  });

  textureLoader.load(`${basePath}textures/bake_floor-quality-3.jpg`, (tex) => {
    tex.flipY = false;
    tex.encoding = THREE.sRGBEncoding;
    assists.bakeFloorTexture = tex;
  });

  const cubeTextureLoader = new THREE.CubeTextureLoader(manager);

  cubeTextureLoader.load(
    [
      `${basePath}textures/environmentMap/px.jpg`,
      `${basePath}textures/environmentMap/nx.jpg`,
      `${basePath}textures/environmentMap/py.jpg`,
      `${basePath}textures/environmentMap/ny.jpg`,
      `${basePath}textures/environmentMap/pz.jpg`,
      `${basePath}textures/environmentMap/nz.jpg`,
    ],
    (tex) => {
      assists.environmentMapTexture = tex;
    }
  );

  // Mesh
  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.load(`${basePath}models/Commodore710_33.5.glb`, (gltf) => {
    assists.screenMesh = gltf.scene.children.find((m) => m.name === "Screen");
    assists.computerMesh = gltf.scene.children.find(
      (m) => m.name === "Computer"
    );
    assists.crtMesh = gltf.scene.children.find((m) => m.name === "CRT");
    assists.keyboardMesh = gltf.scene.children.find(
      (m) => m.name === "Keyboard"
    );
    assists.shadowPlaneMesh = gltf.scene.children.find(
      (m) => m.name === "ShadowPlane"
    );
  });
}

export { loadAssists };
export type { Assists };

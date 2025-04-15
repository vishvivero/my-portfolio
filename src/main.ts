import "./main.css";
import WebGL from "./webgl";

// Initialize WebGL to render the retro computer with enhanced error handling
let initAttempts = 0;
const maxAttempts = 3;

function logMessage(message: string, isError = false) {
  if (isError) {
    console.error(message);
  } else {
    console.log(message);
  }
  
  // For debugging in production
  const debugEl = document.createElement('div');
  debugEl.style.display = 'none'; // Hidden by default
  debugEl.innerText = message;
  document.body.appendChild(debugEl);
}

function showFallbackContent() {
  const heroBackup = document.getElementById('hero-backup');
  const errorMsg = document.getElementById('webgl-error');
  
  if (heroBackup) heroBackup.style.display = 'flex';
  if (errorMsg) errorMsg.style.display = 'block';
  
  const canvas = document.querySelector('.webgl');
  if (canvas) canvas.classList.add('webgl-failed');
}

function initWebGL() {
  try {
    logMessage("Initializing WebGL...");
    
    // Check if WebGL is available
    const canvas = document.createElement('canvas');
    const hasWebGL = !!(window.WebGLRenderingContext && 
                  (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    
    if (!hasWebGL) {
      throw new Error("WebGL not supported in this browser");
    }
    
    // Initialize WebGL with the 3D computer
    WebGL();
    logMessage("WebGL initialized successfully");
  } catch (error) {
    logMessage(`Error initializing WebGL: ${error}`, true);
    
    // Show backup content if WebGL fails
    showFallbackContent();
    
    // Retry initialization if we haven't exceeded max attempts
    initAttempts++;
    if (initAttempts < maxAttempts) {
      logMessage(`Retrying WebGL initialization (attempt ${initAttempts + 1}/${maxAttempts})...`);
      setTimeout(initWebGL, 1500); // Longer delay between retries
    }
  }
}

// Wait for the window to fully load before initializing WebGL
if (document.readyState === 'complete') {
  initWebGL();
} else {
  window.addEventListener('load', initWebGL);
}

const root = document.documentElement;

function onScroll() {
  if (window.scrollY > 10) root.dataset.scroll = "true";
  else root.dataset.scroll = "false";
}
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

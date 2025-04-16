// WebGL Debug and Fix Script
console.log("🔍 WebGL debug script loaded");

// Store WebGL initialization function for later use
var webglInitialized = false;
var webglInitializeAttempts = 0;

// Fix for WebGL initialization
window.fixWebGL = function() {
  console.log("🔧 Applying WebGL fixes...");
  
  // Check if WebGL is supported
  function checkWebGLSupport() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch(e) {
      console.error("❌ WebGL check failed:", e);
      return false;
    }
  }
  
  // Show fallback content if WebGL fails
  function showFallback() {
    console.log("⚠️ Showing fallback content");
    var heroBackup = document.getElementById('hero-backup');
    if (heroBackup) heroBackup.style.display = 'flex';
    
    var webglCanvas = document.querySelector('.webgl');
    if (webglCanvas) webglCanvas.style.display = 'none';
    
    var errorMessage = document.getElementById('webgl-error');
    if (errorMessage) errorMessage.style.display = 'block';
  }
  
  // Force WebGL initialization once the main script is loaded
  function initializeWebGL() {
    if (webglInitialized) return;
    webglInitializeAttempts++;
    
    if (webglInitializeAttempts > 3) {
      console.error("❌ Failed to initialize WebGL after multiple attempts");
      showFallback();
      return;
    }
    
    console.log("🔄 Attempting to initialize WebGL...");
    
    if (!checkWebGLSupport()) {
      console.error("❌ WebGL not supported in this browser");
      showFallback();
      return;
    }
    
    // Try to access the WebGL function from the global scope or window
    if (typeof window.WebGL === 'function') {
      try {
        window.WebGL();
        webglInitialized = true;
        console.log("✅ WebGL successfully initialized");
      } catch (err) {
        console.error("❌ Error initializing WebGL:", err);
        setTimeout(initializeWebGL, 500); // Retry after delay
      }
    } else {
      console.log("⏳ WebGL function not available yet, waiting...");
      setTimeout(initializeWebGL, 500); // Wait for WebGL to be defined
    }
  }
  
  // Call after DOM is interactive
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebGL);
  } else {
    // Try immediately if DOM is already loaded
    initializeWebGL();
  }
  
  // Also try again when window is fully loaded
  window.addEventListener('load', initializeWebGL);
};

// Execute immediately
window.fixWebGL();

// Fix WebGL asset paths
function fixWebGLPaths() {
  // Override the WebGL asset loader path resolution
  if (window.THREE && window.THREE.Loader) {
    const originalLoad = window.THREE.Loader.prototype.load;
    window.THREE.Loader.prototype.load = function(url, ...args) {
      console.log(`🔧 Loading WebGL asset: ${url}`);
      
      // Ensure paths start with ./ for relative paths
      let fixedUrl = url;
      if (!url.startsWith('http') && !url.startsWith('./') && !url.startsWith('/')) {
        fixedUrl = './' + url;
      }
      
      console.log(`✅ Fixed URL: ${fixedUrl}`);
      return originalLoad.call(this, fixedUrl, ...args);
    };
    console.log("✅ Patched THREE.Loader for correct path resolution");
  }
} 
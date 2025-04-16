import "./main.css";
import WebGL from "./webgl";

// Immediately invoke WebGL to render the retro computer
console.log("🖥️ Initializing retro computer animation...");

// Simple error handler function
function handleWebGLError(error: any) {
  console.error("Failed to initialize WebGL:", error);
  
  // Show fallback content
  const heroBackup = document.getElementById('hero-backup');
  if (heroBackup) heroBackup.style.display = 'flex';
  
  const webglCanvas = document.querySelector('.webgl');
  if (webglCanvas) (webglCanvas as HTMLElement).style.display = 'none';
}

// Initialize WebGL immediately
try {
  // Only initialize once DOM is interactive
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log("DOM Content Loaded - initializing WebGL");
      WebGL();
    });
  } else {
    // DOM already ready, initialize immediately
    console.log("DOM already ready - initializing WebGL immediately");
    WebGL();
  }
} catch (error) {
  handleWebGLError(error);
}

// Add scroll behavior
const root = document.documentElement;

function onScroll() {
  if (window.scrollY > 10) root.dataset.scroll = "true";
  else root.dataset.scroll = "false";
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

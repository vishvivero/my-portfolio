import "./main.css";
import WebGL from "./webgl";

// Initialize WebGL to render the retro computer with retry logic
let initAttempts = 0;
const maxAttempts = 3;

function initWebGL() {
  try {
    console.log("Initializing WebGL...");
    WebGL();
    console.log("WebGL initialized successfully");
  } catch (error) {
    console.error("Error initializing WebGL:", error);
    
    // Show backup content if WebGL fails
    const heroBackup = document.getElementById('hero-backup');
    if (heroBackup) heroBackup.style.display = 'flex';
    
    // Retry initialization if we haven't exceeded max attempts
    initAttempts++;
    if (initAttempts < maxAttempts) {
      console.log(`Retrying WebGL initialization (attempt ${initAttempts + 1}/${maxAttempts})...`);
      setTimeout(initWebGL, 1000); // Retry after 1 second
    }
  }
}

// Only initialize when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWebGL);
} else {
  // DOM already loaded, initialize now
  initWebGL();
}

const root = document.documentElement;

function onScroll() {
  if (window.scrollY > 10) root.dataset.scroll = "true";
  else root.dataset.scroll = "false";
}
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

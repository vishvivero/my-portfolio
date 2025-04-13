import "./main.css";
import WebGL from "./webgl";

// Initialize WebGL to render the retro computer
document.addEventListener('DOMContentLoaded', () => {
  WebGL();
});

const root = document.documentElement;

function onScroll() {
  if (window.scrollY > 10) root.dataset.scroll = "true";
  else root.dataset.scroll = "false";
}
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

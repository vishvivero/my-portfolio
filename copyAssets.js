// This is an ES module
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🔄 Starting WebGL asset copying process...');

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination paths
const publicDir = path.resolve(__dirname, 'public');
const distDir = path.resolve(__dirname, 'dist');

// Check if source directories exist
const requiredDirs = ['models', 'textures', 'fonts'];
const missingDirs = [];

for (const dir of requiredDirs) {
  const dirPath = path.join(publicDir, dir);
  if (!fs.existsSync(dirPath)) {
    missingDirs.push(dir);
    console.error(`❌ ERROR: Required directory not found: ${dirPath}`);
  }
}

if (missingDirs.length > 0) {
  console.error(`❌ ERROR: Missing required directories: ${missingDirs.join(', ')}`);
  process.exit(1);
}

// Ensure the dist directory exists
try {
  fs.ensureDirSync(distDir);
  console.log(`✅ Destination directory verified: ${distDir}`);
} catch (error) {
  console.error(`❌ ERROR: Failed to create or verify dist directory: ${error.message}`);
  process.exit(1);
}

// Function to copy a directory with logging
function copyDirectoryWithLogging(src, dest) {
  try {
    fs.copySync(src, dest, { overwrite: true });
    // Count files copied
    const fileCount = fs.readdirSync(dest).length;
    console.log(`✅ Copied ${fileCount} files from ${path.basename(src)} to ${path.basename(dest)}`);
    return true;
  } catch (error) {
    console.error(`❌ ERROR: Failed to copy ${src} to ${dest}: ${error.message}`);
    return false;
  }
}

// Copy models, textures, and fonts directories
let successCount = 0;
successCount += copyDirectoryWithLogging(path.join(publicDir, 'models'), path.join(distDir, 'models')) ? 1 : 0;
successCount += copyDirectoryWithLogging(path.join(publicDir, 'textures'), path.join(distDir, 'textures')) ? 1 : 0;
successCount += copyDirectoryWithLogging(path.join(publicDir, 'fonts'), path.join(distDir, 'fonts')) ? 1 : 0;

// Summary
if (successCount === requiredDirs.length) {
  console.log('✅ All WebGL assets successfully copied to dist folder!');
} else {
  console.error(`⚠️ WARNING: Only ${successCount}/${requiredDirs.length} asset directories were copied successfully.`);
  if (successCount === 0) {
    process.exit(1);
  }
}

// Verify the key model file exists
const modelPath = path.join(distDir, 'models', 'Commodore710_33.5.glb');
if (fs.existsSync(modelPath)) {
  const stats = fs.statSync(modelPath);
  console.log(`✅ Verified key model file (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
} else {
  console.error('❌ ERROR: Key model file missing after copy!');
} 
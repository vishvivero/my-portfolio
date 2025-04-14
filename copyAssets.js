// This is an ES module
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('Copying 3D assets to dist folder...');

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination paths
const publicDir = path.resolve(__dirname, 'public');
const distDir = path.resolve(__dirname, 'dist');

// Ensure the dist directory exists
fs.ensureDirSync(distDir);

// Copy models, textures, and fonts directories
fs.copySync(path.join(publicDir, 'models'), path.join(distDir, 'models'), { overwrite: true });
fs.copySync(path.join(publicDir, 'textures'), path.join(distDir, 'textures'), { overwrite: true });
fs.copySync(path.join(publicDir, 'fonts'), path.join(distDir, 'fonts'), { overwrite: true });

console.log('Assets successfully copied to dist folder!'); 
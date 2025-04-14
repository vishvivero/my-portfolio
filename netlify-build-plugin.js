module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('Preparing build for WebGL assets...');
  },
  onBuild: ({ utils }) => {
    console.log('Completed build with WebGL assets. Making sure they are properly handled.');
  },
  onPostBuild: ({ utils }) => {
    // Copy assets to ensure they're in the correct location
    console.log('Ensuring 3D models and textures are in the right location...');
    utils.run.command('cp -r public/models dist/');
    utils.run.command('cp -r public/textures dist/');
    utils.run.command('cp -r public/fonts dist/');
    console.log('Assets copied successfully!');
  }
}; 
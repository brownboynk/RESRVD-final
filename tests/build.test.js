const { exec } = require('child_process');

describe('Build Process', () => {
  it('should build without errors', (done) => {
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error(`Build failed: ${error.message}`);
        done(error);
      } else {
        console.log(stdout);
        console.error(stderr);
        done();
      }
    });
  });
});


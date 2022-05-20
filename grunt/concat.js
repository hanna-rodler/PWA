module.exports = {
  dist: {
    src: ['app/pwa.js', 'app/serviceworker.js','app/js/*.js', 'app/views/*.js'],
    dest: 'app/public/main.js',
  }
};
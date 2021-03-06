module.exports = {
  css: {
    files: 'app/assets/**/*.scss',
    tasks: ['sass', 'cssmin'],
    options: {
      livereload: true,
    },
  },

  scripts: {
    files: ['app/js/*.js', 'app/pwa.js', 'app/serviceworker.js', 'app/views/*.js'],
    tasks: ['concat', 'uglify'],
  },
};
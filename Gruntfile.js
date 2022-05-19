module.exports = function(grunt) {
  var tasks = {scope: ['devDependencies', 'dependencies']};
  var options = {config: { src: "grunt/*.js" }};
  var configs = require('load-grunt-configs')(grunt, options);
  require('load-grunt-tasks')(grunt, tasks);
  grunt.initConfig(configs);
  // grunt.registerTask('default', ['cssmin', 'sass', 'concat', 'uglify', 'watch']);
  grunt.registerTask('default', ['watch']);
};
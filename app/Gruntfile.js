module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      css: {
        files: 'app/assets/**/*.scss',
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true,
        },
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'app/public/main.min.css': 'app/public/main.css'
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'app/public/main.css': 'app/assets/scss/main.scss',       // 'destination':
          // 'source'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['sass', 'cssmin']);
};
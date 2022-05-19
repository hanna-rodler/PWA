module.exports = {
  dist: {                            // Target
    options: {                       // Target options
      style: 'expanded'
    },
    files: {                         // Dictionary of files
      'app/public/main.css': 'app/assets/scss/main.scss',       // 'destination':
      // 'source'
    }
  }
};
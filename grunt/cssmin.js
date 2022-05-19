module.exports = {
  options: {
    mergeIntoShorthands: false,
    roundingPrecision: -1
  },
  target: {
    files: {
      'app/public/main.min.css': 'app/public/main.css'
    }
  }
};
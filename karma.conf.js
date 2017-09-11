const path = require('path');

module.exports = function c(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: ['*.js', 'test/*.js'],
    exclude: [],
    preprocessors: {
      '*.js': ['webpack'],
      'test/*.js': ['webpack']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
    webpack: {
      entry: './bus.js',
      output: {
        path: path.join(__dirname, '.'),
        filename: 'bus.min.js'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          include: [path.join(__dirname, '.'), path.join(__dirname, 'test')],
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};

const path = require('path');

module.exports = function c(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: ['test/*.js'],
    preprocessors: {
      'src/*.js': ['webpack', 'sourcemap'],
      'test/*.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
    webpack: {
      devtool: 'inline-source-map',
      entry: './src/bus.js',
      output: {
        path: path.join(__dirname, 'src'),
        filename: 'bus.min.js'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }, {
          test: /\.js$/,
          exclude: /node_modules|\-test\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            }
          }
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'html',
        subdir: 'html'
      }, {
        type: 'lcov',
        subdir: 'lcov'
      }]
    }
  });
};

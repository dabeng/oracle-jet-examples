// Karma configuration
// Generated on Wed Jan 23 2019 21:17:07 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
      "./web/js/libs/knockout/knockout-3.4.2.debug.js",
      "./web/js/libs/jquery/jquery-3.3.1.js",
      "./web/js/libs/jquery/jqueryui-amd-1.12.1/**/*.js",
      "./web/js/libs/es6-promise/es6-promise.js",
      "./web/js/libs/hammer/hammer-2.0.8.js",
      "./web/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.js",
      "./web/js/libs/oj/v6.0.0/debug/**/*.js",
      "./web/js/libs/oj/v6.0.0/ojL10n.js",
      "./web/js/libs/oj/v6.0.0/resources/**/*.js",
      "./web/js/libs/require/text.js",
      "./web/js/libs/js-signals/signals.js",
      "./web/js/libs/webcomponents/custom-elements.min.js",
      // "./web/js/libs/proj4js/dist/proj4-src.js",
      "./web/js/libs/require-css/css.js",
      "./web/js/libs/touchr/touchr.js",
      "./src/js/views/spa-router/*.js",
      "./test/**/*.spec.js",
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

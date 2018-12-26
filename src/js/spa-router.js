'use strict';

requirejs.config(
{
  baseUrl: 'js',

  // Path mappings for the logical module names
  // Update the main-release-paths.json for release mode when updating the mappings
  paths:
  //injector:mainReleasePaths
  {
    'knockout': 'libs/knockout/knockout-3.4.2.debug',
    'jquery': 'libs/jquery/jquery-3.3.1',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'libs/oj/v6.0.0/debug',
    'ojL10n': 'libs/oj/v6.0.0/ojL10n',
    'ojtranslations': 'libs/oj/v6.0.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals',
    'customElements': 'libs/webcomponents/custom-elements.min',
    'proj4': 'libs/proj4js/dist/proj4-src',
    'css': 'libs/require-css/css',
    'touchr': 'libs/touchr/touchr'    
  }
  //endinjector
}
);

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout'],
  function (oj, ko, $, moduleUtils) { // this callback gets executed when all required modules are loaded
        // Router setup
    oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

    var router = oj.Router.rootInstance;
    router.configure({
      'vue': {label: 'Vue', isDefault: true },
      'webpack': {label: 'Webpack'},
      'axios': {label: 'Axios'},
      'firebase/{subtitle}': {label: 'Firebase'}
    });

    function ViewModel() {
      var self = this;

      self.router = router;
      //initialize oj-module config
      self.moduleConfig = ko.observable({'view':[], 'viewModel':null});
      //update module config every time as router.moduleConfig mutates
      ko.computed(function() {
        var name = self.router.moduleConfig.name();
        var viewPath = 'views/spa-router/' + name + '.html';
        var modelPath = 'viewModels/spa-router/' + name;
        var masterPromise = Promise.all([
          moduleUtils.createView({'viewPath':viewPath}),
          moduleUtils.createViewModel({'viewModelPath':modelPath})
        ]);
        masterPromise.then(
          function(values){
            var viewModel = typeof values[1] === 'function' ? new values[1](self.router) : values[1];
            self.moduleConfig({'view':values[0],'viewModel':viewModel});
          }
        );
      });
    }
    
    $(function() {

      oj.Router.sync().then(function () {
          ko.applyBindings(new ViewModel(), document.getElementById('globalBody'));
        }, function (error) {
          oj.Logger.error('Error when starting router: ' + error.message);
        });

    });

  }
);

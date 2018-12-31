'use strict';

requirejs.config({
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
});

require(['jquery', 'knockout', 'ojs/ojmodule-element-utils', 'signals', 'ojs/ojmodule-element', 'ojs/ojknockout'],
  function($, ko, moduleUtils, signals) {
    function ParentViewModel() {
    
      function resolveVVM(name, moduleConfig, customEvent) {
        var masterPromise = Promise.all([
          moduleUtils.createView({'viewPath':'views/views-communication/'+ name + '.html'}),
          moduleUtils.createViewModel({'viewModelPath':'viewModels/views-communication/'+ name})
        ]);
        masterPromise.then(
          function(values){
            var viewModel = new values[1](customEvent);
            moduleConfig({'view':values[0],'viewModel':viewModel});
          },
          function(reason){}
        );
      };
      
      var self = this;
      self.usernameChanged = new signals.Signal();
      self.usercityChanged = new signals.Signal();
      self.view1Config = ko.observable({'view':[],'viewModel':null});
      self.view2Config = ko.observable({'view':[],'viewModel':null});
      resolveVVM('view1', self.view1Config, { 'usernameChanged': self.usernameChanged, 'usercityChanged': self.usercityChanged });
      resolveVVM('view2', self.view2Config, { 'usernameChanged': self.usernameChanged, 'usercityChanged': self.usercityChanged });
    }
    $(function()
    {
      ko.applyBindings(new ParentViewModel(), document.getElementById('moduleDemo'));
    });
  }
);

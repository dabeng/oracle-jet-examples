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

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojknockout', 'ojs/ojbutton'],
  function(oj, ko, $, moduleUtils) {

    function ParentViewModel() {
      var self = this;

      self.btnCaption = ko.observable('123');
      self.clickBtn = ko.observable(function() {
        alert('123');
      });
      self.childConfig = ko.observable({'view':[],'viewModel':null});

        Promise.all([
          moduleUtils.createView({'viewPath':'views/parent-child-communication/child.html'}),
          moduleUtils.createViewModel({'viewModelPath':'viewModels/parent-child-communication/child'})
        ]).then(function(values){
            var viewModel = new values[1](self.btnCaption, self.clickBtn);
            // var viewModel = typeof values[1] === 'function' ? new values[1](self.router) : values[1];
            self.childConfig({'view':values[0],'viewModel':viewModel});
          },
          function(reason){}
        );

    }

    $(function() {

      ko.applyBindings(new ParentViewModel());

    });

});

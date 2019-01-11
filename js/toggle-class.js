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

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojbutton'],
  function(oj, ko, $) {

    function ViewModel() {
      var self = this;

      self.bgColor = [
        { 'value': 'bg-primary', 'label': 'Primary background color' },
        { 'value': 'bg-success', 'label': 'Success background color' },
        { 'value': 'bg-danger', 'label': 'Danger background color' },
        { 'value': 'bg-warning', 'label': 'Warning background color' },
        { 'value': 'bg-info', 'label': 'Info background color' }
      ];
      self.selectedColor = ko.observable('bg-primary');
      self.cardClass = ko.pureComputed(function () {
        return self.selectedColor() + ' circle';
      });

    }

    $(function() {

      ko.applyBindings(new ViewModel());

    });

});

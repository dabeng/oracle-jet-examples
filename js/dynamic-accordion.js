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

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojaccordion', 'ojs/ojbutton'],
  function(oj, ko, $) {

    function ViewModel() {
      var self = this;

      self.panels = ko.observableArray([
        { 'heading': 'Head 1', 'body': 'Body 1', 'expanded': ko.observable(false) },
        { 'heading': 'Head 2', 'body': 'Body 2', 'expanded': ko.observable(false) },
        { 'heading': 'Head 3', 'body': 'Body 3', 'expanded': ko.observable(false) }
      ]);

      self.clickHeader = function (event, data, bindingContext) {
        var expanded = event.currentTarget.parentNode.expanded;
        if (expanded) { // if collapse panel
          data.data.expanded(!expanded); // just need to collapse current cliked item
        } else { // if expand panel
          bindingContext.$data.panels().forEach(function(panel, index) {
            if (data.observableIndex() === index) {
              panel.expanded(!expanded); // collapse current clicked item and
            } else {
              panel.expanded(expanded); // collapse the expanded items at the same time
            }
          });
        }
      };

      self.addItem = function() {
        var number = self.panels().length + 1;
        self.panels().forEach(function (panel) {
          panel.expanded(false);
        });
        self.panels.push({ 'heading': 'Head ' + number, 'body': 'Body ' + number, 'expanded': ko.observable(true) });
        $('#myAccordion')[0].refresh();
      };

      self.deleteItem = function(event, data, bindingContext) {
        self.panels.splice(data.observableIndex(), 1);
      };

    }

    $(function() {

      ko.applyBindings(new ViewModel());

    });

});

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

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojdialog', 'ojs/ojbutton', 'ojs/ojinputtext'],
  function(oj, ko, $) {

    function ViewModel() {
      var self = this;

        self.headerContent = ko.observable('');
        self.bodyContent = ko.observable('');
        self.showOKBtn = ko.observable(true);
        self.showCancelBtn = ko.observable(true);
        self.okBtnCaption = ko.observable('OK');
        self.cancelBtnCaption = ko.observable('Cancel');
        self.clickOKBtn = ko.observable();
        self.clickCancelBtn = ko.observable();

        self.close = function (event) {
          document.getElementById('modalDialog').close();
        }

        self.openVue = function (event) {
          self.headerContent('Vue');
          self.bodyContent('Vue is a progressive framework for building user interfaces.');
          self.showOKBtn(true);
          self.showCancelBtn(true);
          self.okBtnCaption('OK');
          self.cancelBtnCaption('Cancel');
          self.clickOKBtn(function () {
            alert('Vue is awesome!');
          });
          self.clickCancelBtn(function () {
            alert('Vue is cool!');
          });
          document.getElementById('modalDialog').open();
        }

        self.openVuex = function (event) {
          self.headerContent('Vuex');
          self.bodyContent('Vuex is a state management pattern + library for Vue.js applications.');
          self.showOKBtn(true);
          self.showCancelBtn(true);
          self.okBtnCaption('Yes');
          self.cancelBtnCaption('No');
          self.clickOKBtn(function () {
            alert('Vuex is awesome!');
          });
          self.clickCancelBtn(function () {
            alert('Vuex is cool!');
          });
          document.getElementById('modalDialog').open();
        }

        self.openFirebase = function (event) {
          self.headerContent('Firebase');
          self.bodyContent('Firebase is Google’s mobile platform that helps you quickly develop high-quality apps and grow your business.');
          self.showOKBtn(false);
          self.showCancelBtn(false);
          document.getElementById('modalDialog').open();
        }

    }

    $(function() {

      ko.applyBindings(new ViewModel());

    });

});

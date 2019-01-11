define(['ojs/ojcore', 'knockout', 'ojs/ojknockout'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;

      self.appName = ko.observable('Learn Oracle JET with examples');
     }

     return new ControllerViewModel();
  }
);

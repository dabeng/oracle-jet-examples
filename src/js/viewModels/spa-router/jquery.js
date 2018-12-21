define(['knockout','ojs/ojbutton', 'ojs/ojinputtext'],
  function(ko)
  {
    function viewModel (parentRouter) {
      var self = this;

      var rawSubtitle = parentRouter.currentState().parameters.subtitle;
      self.subtitle = rawSubtitle && JSON.parse(rawSubtitle).content ? JSON.parse(rawSubtitle).content : undefined;
      self.hasSubtitle = ko.observable(self.subtitle ? true : false);
      self.buttonClick = function(event){
        parentRouter.go(event.currentTarget.id);
      }
    }
    return viewModel;
  }
);
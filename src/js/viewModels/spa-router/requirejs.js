define(['knockout','ojs/ojbutton'],
  function(ko)
  {
    function viewModel (parentRouter) {
      var self = this;

      self.buttonClick = function(event){
        parentRouter.go(event.currentTarget.id);
      }
    }
    return viewModel;
  }
);
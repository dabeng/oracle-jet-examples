define(['knockout','ojs/ojbutton'],
  function(ko)
  {
    function viewModel (parentRouter) {
      var self = this;

      self.buttonClick = function(event){
        parentRouter.go(event.currentTarget.id);
      }

      self.add = function (a, b) {
        return a + b;
      }
    }
    return viewModel;
  }
);
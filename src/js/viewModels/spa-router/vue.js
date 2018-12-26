define(['knockout','ojs/ojbutton'],
  function(ko)
  {
    function viewModel (parentRouter) {
      var self = this;

      self.buttonClick = function(event){
        if (event.currentTarget.id === 'firebase') {
          parentRouter.go('firebase/' + JSON.stringify({ 'content': 'Firebase is awesome !!!' }));
        } else {
          parentRouter.go(event.currentTarget.id);
        }
        
      }
    }
    return viewModel;
  }
);
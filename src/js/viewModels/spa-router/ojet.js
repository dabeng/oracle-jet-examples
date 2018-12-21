define(['knockout','ojs/ojbutton'],
  function(ko)
  {
    function viewModel (parentRouter) {
      var self = this;

      self.buttonClick = function(event){
        if (event.currentTarget.id === 'jquery') {
          parentRouter.go('jquery/' + JSON.stringify({ 'content': 'jQuery is awesome !' }));
        } else {
          parentRouter.go(event.currentTarget.id);
        }
        
      }
    }
    return viewModel;
  }
);
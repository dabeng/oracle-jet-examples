define(['knockout','ojs/ojbutton'],
  function(ko)
  {
    function ViewModel (caption, clickAction) {
      var self = this;

      self.buttonClick = function(event){
        caption('666');
        clickAction(function() {
          alert('666');
        });
      }
    }
    return ViewModel;
  }
);
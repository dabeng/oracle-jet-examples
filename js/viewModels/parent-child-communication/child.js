define(['knockout','ojs/ojbutton'],
  function(ko)
  {
    function ViewModel (para) {
      var self = this;

      self.buttonClick = function(event){
        para.a('666');
        para.b(function() {
          alert('666');
        });
      }
    }
    return ViewModel;
  }
);
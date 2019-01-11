define(['knockout','ojs/ojinputtext'],
  function(ko)
  {
    function ViewModel (params) {
      var self = this;
      var usernameChanged = params.usernameChanged;
      var usercityChanged = params.usercityChanged;
      self.userName = ko.observable();
      self.userCity = ko.observable();

      ko.computed(function(){
        usernameChanged.dispatch(self.userName());
      });

      usercityChanged.add(function(city) {
        self.userCity(city);
      });
    }

    return ViewModel;
  }
);
define(['knockout','ojs/ojinputtext'],
  function(ko)
  {
    function ViewModel (params) {
      var self = this;
      var usernameChanged = params.usernameChanged;
      var usercityChanged = params.usercityChanged;
      self.userName = ko.observable();
      self.userCity = ko.observable();

      usernameChanged.add(function(user) {
        self.userName(user);
      });

      ko.computed(function(){
        usercityChanged.dispatch(self.userCity());
      });
    }
    return ViewModel;
  }
);
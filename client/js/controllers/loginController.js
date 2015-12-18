myApp.controller('loginController', function($scope, $state, LoginFactory) {
   var mv = this;

   mv.signInPatient = function() {
      LoginFactory.loginPatient(mv.loginPatient , function(){
         mv.checkLogin();
      });
   }

   mv.checkLogin = function() {
      console.log(LoginFactory.getPatient());
      if (LoginFactory.getPatient()) {
         $state.go('dashboard.main');
      }
   }

   //mv.checkLogin();
});
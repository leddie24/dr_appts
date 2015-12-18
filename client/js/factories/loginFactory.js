myApp.factory('LoginFactory', function($sessionStorage, $http) {
   var factory = {};

   $sessionStorage.currPatient;

   factory.loginPatient = function(userinfo, callback) {
      console.log(userinfo);
      $http.post('/login', userinfo)
      .then(function (response) {
         console.log(response);
         $sessionStorage.currPatient = response.data;
         callback();
      })
      .catch(function(response) {
         console.log(response, "Error getting user");
      });
   }

   factory.getPatient = function() {
      return $sessionStorage.currPatient;
   }

   factory.getUserById = function(id, callback) {
      $http.get('/userinfo/' + id)
      .then(function (response) {
         console.log('got data for user');
         callback(response.data);
      })
      .catch(function (response) {
         console.log(response, "Error getting user");
      })
   }

   factory.logOutPatient = function() {
      $sessionStorage.currPatient = null;
      
   }

   return factory;
});
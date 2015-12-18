myApp.factory('AppointmentFactory', function($sessionStorage, $http) {
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

   factory.getAppointments = function(callback) {
      $http.get('/apptlist')
      .then(function (response) {
         console.log(response.data);
         callback(response.data);
      })
      .catch(function (response) {
         console.log(response, 'error getting appts');
      })
   }

   factory.addAppointment = function(apptinfo, callback) {
      $http.post('/addappt', apptinfo)
      .then(function (response) {
         console.log(response);
         callback(response);
      })
      .catch(function (response) {
         console.log(response, "error adding appt");
         callback(response);
      })
   }

   factory.cancelAppt = function(appt, callback) {
      $http.post('/cancelappt', appt)
      .then(function (response) {
         callback();
      })
      .catch(function (response) {
         console.log(response);
      })
   }

   return factory;
});
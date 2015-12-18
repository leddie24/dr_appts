myApp.controller('dashboardController', function($scope, $state, LoginFactory, AppointmentFactory) {
   var mv = this;

   mv.curr_patient = LoginFactory.getPatient();
   mv.todayDate = new Date();

   mv.checkLogin = function() {
      if (!LoginFactory.getPatient()) {
         $state.go('login', null, { reload: true });
      }
   }

   mv.index = function() {
      console.log('fetch appts');
      AppointmentFactory.getAppointments(function(data) {
         mv.appointments = data;
      })
   }

   mv.cancelAppt = function(appt) {
      console.log(appt);
      AppointmentFactory.cancelAppt(appt, function() {
         mv.index();
      })
   }

   mv.logOutPatient = function() {
      LoginFactory.logOutPatient();
      $state.go('login');
   }

   mv.search = function (row) {
     return (angular.lowercase(row.complain).indexOf(angular.lowercase(mv.searchAppts) || '') !== -1 ||
             angular.lowercase(row._patient.name).indexOf(angular.lowercase(mv.searchAppts) || '') !== -1);
   };

   mv.checkLogin();

   mv.index();

});
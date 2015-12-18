myApp.controller('appointmentController', function($scope, $state, LoginFactory, AppointmentFactory) {
   var mv = this;

   mv.curr_patient = LoginFactory.getPatient();
   mv.showError = false;
   mv.validForm = false;
   

   mv.addAppointment = function() {
      var info = {
         patient: mv.curr_patient,
         apptInfo: mv.newAppointmentInfo
      }
      AppointmentFactory.addAppointment(info, function(response) {
         if (response.data.err) {
            mv.showError = true;
            mv.errorMsg = response.data.err;
         } else {
            $state.go('dashboard.main', null, { reload: true });
         }
      })
   }

   //mv.checkLogin();
});
var loginController = require('../controllers/loginController.js');
var apptController = require('../controllers/appointmentController.js');


module.exports = function(app) {
   app.post('/login', function (req, res) {
      loginController.loginPatient(req, res);
   });

   app.get('/apptlist', function (req, res) {
      apptController.getAppts(req, res);
   })

   app.post('/addappt', function (req, res) {
      apptController.addAppt(req, res);
   });

   app.post('/cancelappt', function (req, res) {
      apptController.cancelAppt(req, res);
   })
}
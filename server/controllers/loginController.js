var mongoose = require('mongoose');
var Patient = mongoose.model('Patient');

module.exports = {
   loginPatient: function(req, res) {
      console.log(req.body);
      Patient.findOne({ name: req.body.name }, function(err, patient){
         if(patient){
            console.log('found patient?', patient);
            res.json(patient);
         }
         else if(!patient){
            var newPatient = new Patient({ name: req.body.name });
            newPatient.save(function(err){
               if(err){
                  console.log(err);
                  res.json(err);
               }else{
                  console.log('Added new patient', newPatient);
                  res.json(newPatient);
               }
            })
         }
      })
   },
   getPatient: function(req, res) {
      console.log('hello', req.params);
      Patient.findById(req.params.id, function(err, patient) {
         if (err) {
            console.log(err, 'error getting patient');
         } else {
            res.json(patient);
         }
      })
   }
}
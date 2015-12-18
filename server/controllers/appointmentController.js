var mongoose = require('mongoose');
var Patient = mongoose.model('Patient');
var Appointment = mongoose.model('Appointment');


module.exports = {
   getAppts: function(req, res) {
      Appointment.find({}).populate('_patient').exec(function(err, appts) {
         console.log(appts);
         if (err) {
            console.log(err, 'error getting appointments');
         } else {
            res.json(appts);
         }
      });
   },
   addAppt: function(req, res) {
      var apptDate = new Date(req.body.apptInfo.apptDate);
      var dayAfter = new Date(apptDate);
      dayAfter.setDate(dayAfter.getDate() + 1);


      // LOOK FOR APPOINTMENTS ON THIS DAY
      Appointment.find({
         apptDate:
         {
            $gte : apptDate,
            $lt: dayAfter
         }
      }, function (err, appts) {
         if (err) {
            console.log(err, 'error getting appts');
         } else {
            // IF DOCTOR HAS 3 APPOINTMENTS, TELL THEM NO
            if (appts.length >= 3) {
               res.status(400).json({
                  err: "The doctor is full for this day! Pick another date please"
               });
            } else {
               // APPOINTMENTS ARE LESS THAN 3, CHECK IF USER HAS APPOINTMENT ON DATE
               Appointment.find(
               {
                  _patient: req.body.patient._id,
                  apptDate: 
                  {
                     $gte : apptDate, 
                     $lt: dayAfter 
                  }
               }, function (err, appts) {
                  if (err) {
                     console.log(err, 'error finding appt');
                  } else {
                     // USER HAS APPOINTMENT ON DAY, TELL THEM NO
                     if (appts.length >= 1) {
                        res.status(500).json({
                           err: "You already have an appointment on this date"
                        });
                     } else {
                        // USER DOENS'T HAVE APPT, ADD NEW APPT FOR THEM
                        var appt = new Appointment({
                           _patient: req.body.patient._id,
                           apptDate: req.body.apptInfo.apptDate,
                           apptTime: req.body.apptInfo.apptTime,
                           complain: req.body.apptInfo.complain
                        });
                        appt.save(function(err) {
                           if (err) {
                              console.log(err, 'Error adding appt');
                              res.status(500).json({
                                 err: err
                              });
                           } else {
                              console.log('Added new appt', appt);
                              Patient.findByIdAndUpdate(req.body.patient._id, {$push: {_appointments: appt}},
                              function (err, patient) {
                                 if (err) {
                                    console.log(err, 'error updating appt info in patient');
                                 } else {
                                    console.log(patient);
                                    res.json(appt);
                                 }
                              })
                           }
                        })
                     }
                  }
               });
            }
         }
      })
   },
   cancelAppt: function (req, res) {
      Appointment.findByIdAndRemove(req.body._id, function(err, appt) {
         if (err) { 
            console.log(err, 'error removing appt');
         } else {
            Appointment.find({}, function (err, appts) {
               if (err) {
                  console.log(err, 'error getting appts');
               } else {
                  res.json(appts);
               }
            });
         }
      });
   }
}
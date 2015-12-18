var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
   _patient: {type: Schema.Types.ObjectId, ref: 'Patient'},
   apptDate: Date,
   apptTime: Date,
   complain: {type: String, minlength: 4}  
});

mongoose.model('Appointment', AppointmentSchema);
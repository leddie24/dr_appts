var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
   name: {type: String, required: true, minlength: 4, maxlength: 20 },
   _appointments: [{type: Schema.Types.ObjectId, ref: 'Appointment'}]
});

mongoose.model('Patient', PatientSchema);
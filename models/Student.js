// grab the mongoose module
var mongoose = require('mongoose');

// define date schema (could also define directly in model declaration)
var studentSchema = mongoose.Schema(
    {
        // _id = matricularnr
        _id: {type: String, required: true, unique: true},
        course: {type: String, ref: 'Course'},
        modules: [{type: String, ref: 'Module'}],
        //efforts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Effort'}],
        privacyFlag: {type: Boolean, default: false, required: true},
        matricularnr: {type: String, required: true}
        //modulesFetched: {type: Boolean, default: false, required: true}
    },
    {
        collection: 'students'
    }
);
exports.studentModel = mongoose.model('Student', studentSchema);



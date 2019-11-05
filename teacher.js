var mongoose = require('mongoose');
var PostSchema = mongoose.Schema({
    name: {
        type: String,
        // required:true
    },
    teacherid: {
        type: String,
        // required:true
    },
    password: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    courseid: {
        type: String,
        // required: true
    },
    department: {
        type: String,
        // required: true
    },
    contact: {
        type: String,
        // required: true
    }
});
module.exports = mongoose.model('teacher', PostSchema);
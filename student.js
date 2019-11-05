var mongoose = require('mongoose');
var PostSchema = mongoose.Schema({
    name:{ 
        type:String,
        // required:true
    },
    rollno:{
        type:String,
        // required:true
    },
    password: {
        type: String,
        // required: true
    },
    dob: {
        type: String,
        // required: true
    },
    class: {
        type: String,
        // required: true
    },
    section: {
        type: String,
        // required: true
    },
    sex: {
        type: String,
        // required: true
    }
});
module.exports = mongoose.model('student', PostSchema);
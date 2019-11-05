var mongoose = require('mongoose');
var PostSchema = mongoose.Schema({
    name: {
        type: String,
        // required:true
    },
    studentid: {
        type: String,
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
    contact: {
        type: String,
        // required: true
    },
    relation: {
        type: String,
        // required: true
    }
});
module.exports = mongoose.model('parent', PostSchema);
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    jobId : { type : mongoose.Schema.Types.ObjectId , required : true},
    seekerId : { type : mongoose.Schema.Types.ObjectId , required : true},
    status : { type : String , required : true},
    date : { type : String , required : true},
    // user_id : {type : mongoose.Schema.Types.ObjectId , required : true},
});

module.exports = mongoose.model('application',dataSchema);
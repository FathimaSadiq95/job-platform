const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    seeker_id : { type : mongoose.Schema.Types.ObjectId , required : true},
    feed_back : { type : String , required : true},
    date : { type : Date , required : true},

    // user_id : {type : mongoose.Schema.Types.ObjectId , required : true},
});

module.exports = mongoose.model('feedback_seeker',dataSchema);
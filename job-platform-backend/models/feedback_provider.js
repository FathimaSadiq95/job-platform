const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    provider_id : { type : mongoose.Schema.Types.ObjectId , required : true},
    feed_back : { type : String , required : true},
    date : { type : String , required : true},
    
    // user_id : {type : mongoose.Schema.Types.ObjectId , required : true},
});

module.exports = mongoose.model('feedback_provider',dataSchema);
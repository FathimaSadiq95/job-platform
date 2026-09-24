const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username : { type : String , required : true},
    password : { type : String , required : true},
    usertype : { type : String , required : true},

    // user_id : {type : mongoose.Schema.Types.ObjectId , required : true},
});

module.exports = mongoose.model('login',dataSchema);
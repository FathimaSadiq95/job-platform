const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name : { type : String , required : true},
    position : { type : String , required : true},
    organisation : { type : String , required : true},
    aboutorganisation : { type : String , required : true},
    aboutyou: { type : String , required : true},
    images: { type : String , required : true},
    location : { type : String , required : true},
    website: { type : String , required : true},
    date : { type : String , required : true},
    email : { type : String , required : true},
    phone : { type : String , required : true},
    profile_photo : { type : String , required : true},
    address : { type : String , required : true},
    login_id : { type : mongoose.Schema.Types.ObjectId , required : true},
});

module.exports = mongoose.model('provider',dataSchema);
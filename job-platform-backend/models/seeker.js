const mongoose = require('mongoose');
const { Link } = require('react-router-dom');

const dataSchema = new mongoose.Schema({
    name : { type : String , required : true},
    dateofbirth : { type : String , required : true},
    cv : { type : String , required : true},
    profilephoto : { type : String , required : true},
    link : { type : String , required : true},
    about: { type : String , required : true},
    email : { type : String , required : true},
    phone : { type : String , required : true},
    date : { type : String , required : true},
    login_id : {type : mongoose.Schema.Types.ObjectId , required : true},
});

module.exports = mongoose.model('seeker',dataSchema);
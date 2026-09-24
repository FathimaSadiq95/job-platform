const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    post : { type : String , required : true},
    about : { type : String , required : true},
    no_of_vacancies : { type : String , required : true},
    requirements : { type : String , required : true},
    exp_required : { type : String , required : true},
    provider_id : { type : mongoose.Schema.Types.ObjectId , required : true},
    from_date : { type : String , required : true},
    due_date : { type : String , required : true},
    salary : { type : String , required : true},
    status :{type: String, required: true}

    // user_id : {type : mongoose.Schema.Types.ObjectId , required : true},
});

module.exports = mongoose.model('jobs',dataSchema);
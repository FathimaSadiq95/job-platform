const mongoose = require('mongoose');
const { Link } = require('react-router-dom');

const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateofbirth: { type: String, required: true },
    cv: { type: String, required: true },
    profilephoto: { type: String, default: "" },
    link: { type: String, default: "" },
    about: { type: String, required: true },
    qualification: { type: String, default: "" },
    skills: { type: String, default: "" },
    experience: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    jobtype: { type: String, default: "Any" },
    location: { type: String, default: "" },
    login_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('seeker', dataSchema);
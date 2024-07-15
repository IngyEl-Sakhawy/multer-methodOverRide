const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    profile_picture: { type: String },
    birthdate:{type: Date},
});

const student = mongoose.model("student", studentSchema);

module.exports = student;

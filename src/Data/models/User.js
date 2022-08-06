const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    date: { type: Date, required: true },
    userType: { type: String, required: true },
    name: { type: String, required: true },
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    telphone: [{}],
    address: [{}],
    locale: { type: String },
    photo: { type: String },
    invitation: {},
    idSystem: {}
});

module.exports = mongoose.model('User', userSchema);
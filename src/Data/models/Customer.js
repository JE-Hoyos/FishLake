const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    date: { type: Date, required: true },
    idSystem: { type: String, required: true, ref: "System" },
    features: {
        custmerType: {},
        identification: {},
        name: {},
        email: {},
        telphone: {},
        address: {}
    }
});

module.exports = mongoose.model('Customer', customerSchema);
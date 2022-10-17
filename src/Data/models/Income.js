const mongoose = require('mongoose');
const { Schema } = mongoose;

const incomeSchema = new Schema({
    date: { type: Date, required: true },
    idSystem: { type: String, required: true },
    features: {}

});

module.exports = mongoose.model('Income', incomeSchema);
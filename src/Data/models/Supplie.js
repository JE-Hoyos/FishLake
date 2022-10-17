const mongoose = require('mongoose');
const { Schema } = mongoose;

const suppliesSchema = new Schema({
    date: { type: Date, required: true },
    idSystem: { type: String, required: true },
    idOutlay: { type: String, required: true },
    input: {},
    outputs: [{}],
    balance: {},
    notes: [{}]
});

module.exports = mongoose.model('Store', storeSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const suppliesSchema = new Schema({
    date: { type: Date, required: true },
    idSystem: { type: String, required: true, ref: "System" },
    idOutlay: { type: String, required: true, ref: "Outlay" },
    input: {},
    outputs: [{}],
    balance: {},
    notes: [{}]
});

module.exports = mongoose.model('Store', storeSchema);
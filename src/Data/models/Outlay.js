const mongoose = require('mongoose');
const { Schema } = mongoose;

const outlaySchema = new Schema({

    createDate: { type: Date, required: true },
    outlyDate: { type: Date, required: true },
    idSystem: { type: String, required: true, ref: "System" },
    outlayType: { type: String, required: true },
    costCenter: {
        idCenter: { type: String },
        nameCenter: { type: String },
    },
    features: {
        value: { type: Number },
        amount: { type: Number },
        measure: { type: String },
        description: { type: String }
    }

});

module.exports = mongoose.model('Outlay', outlaySchema);
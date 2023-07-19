const mongoose = require('mongoose');
const { Schema } = mongoose;

const qualityControlSchema = new Schema({

    createDate: { type: Date, required: true },
    controlDate: { type: Date, required: true },
    typeControl: {},
    idpond: { required: true, ref: "Pond" },
    unit: {},
    value: {},

})

module.exports = mongoose.model('Store', storeSchema);
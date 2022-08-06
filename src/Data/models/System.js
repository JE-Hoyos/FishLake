const mongoose = require('mongoose');
const { Schema } = mongoose;

const systemSchema = new Schema({
    date: { type: Date, required: true },
    idUserMaster: { type: String, required: true },
    name: { type: String, required: true },

    location: {
        country: { type: String, required: true },
        department: { type: String, required: true },
        latitude: { type: String },
        longitude: { type: String },
    },

    costCenters: [{
        nameCostCenters: { type: String }
    }],

    settings: {

    },

    users: [],

    galery: []
});

module.exports = mongoose.model('System', systemSchema);
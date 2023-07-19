const mongoose = require('mongoose');
const { Schema } = mongoose;

const systemSchema = new Schema({
    date: { type: Date, required: true, default: () => Date.now() },
    idUserMaster: { type: String, required: true },
    name: { type: String, required: true },
    location: {
        country: { type: String, required: true },
        department: { type: String, required: true },
        latitude: { type: String },
        longitude: { type: String },
    },
    descript: { type: String },
    costCenters: [{
        nameCostCenters: { type: String },
        descript: { type: String }
    }],
    outlaySettings: [{}],
    species: [{

    }],
    galery: [],
});

module.exports = mongoose.model('System', systemSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const pondSchema = new Schema({
    date: { type: Date, required: true },
    idSystem: { type: String, required: true },
    typePond: { type: String, required: true },
    name: { type: String, required: true },
    features: {


    },

    qualityControls: [{

    }],

})

module.exports = mongoose.model('Pond', pondSchema);
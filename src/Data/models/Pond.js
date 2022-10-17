const mongoose = require('mongoose');
const { Schema } = mongoose;

// Modelo de estanques
const pondSchema = new Schema({
    date: { type: Date, required: true },
    idSystem: { type: String, required: true },
    typePond: { type: String, required: true },
    name: { type: String, required: true },
    features: {
        material: {},
        area: {},
        depth: {},
    },

})

module.exports = mongoose.model('Pond', pondSchema);
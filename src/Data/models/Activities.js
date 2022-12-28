const mongoose = require('mongoose');
const { Schema } = mongoose;

//Modelo de actividades
const activitiesSchema = new Schema({
    idSystem: { type: String, required: true },
    idUser: {},
    date: { type: Date, required: true },
    typeActivitie: { type: String },
    idProductiveBatche: {},
    description: {},
    duration: {},
    cost: {},
});

module.exports = mongoose.model('activities', activitiesSchema);
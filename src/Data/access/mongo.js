const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(db => console.log("Base de datos conectada!"))
    .catch(err => console.error(err));

module.exports = mongoose;
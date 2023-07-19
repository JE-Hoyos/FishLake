const mongoose = require('mongoose');
const { Schema } = mongoose;

//Modelo de activos
const companyAssetSchema = new Schema({
    date: { type: Date, required: true },
    idSystem: { type: String, required: true, ref: "System" },
    typeAsset: { type: String, required: true },
    features: {
        reference: {},
        datePurchase: { type: Date },
        description: {},
        price: {},
        usefulLife: {},
    },

    //pensar en sacar a otra colección**
    maintenance: [{
        dateMaintenance: {},
        descript: {}
    }]

});

module.exports = mongoose.model('CompanyAsset', companyAssetSchema);
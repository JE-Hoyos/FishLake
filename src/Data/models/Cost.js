const mongoose = require('mongoose');
const { Schema } = mongoose;

const CostSchema = new Schema({
    //Información general del lote
    idSystem: { type: String, required: true },
    idProductiveBatche: { type: String, required: true },
    date: { type: Date, required: true },

    //1. Etapa de reproducción. Etapa de inicio del proceso**
    reproduction: {
        //Resumen
        totalCost: {},
        unitCost: {},

        //Costos variables
        totalVarCost: {},
        rawMaterials: {},
        workforce: {},
        indirectCosts: {},
    },

    //2. Etapa de ovicultura
    oviculture: {
        //Resumen
        totalCost: {},
        unitCost: {},

        //Costos variables
        totalVarCost: {},
        rawMaterials: {},
        workforce: {},
        indirectCosts: {},


    },
    //3. Etapa de larvicultura
    larviculture: {
        //Resumen
        totalCost: {},
        unitCost: {},

        //Costos variables
        totalVarCost: {},
        rawMaterials: {},
        workforce: {},
        indirectCosts: {},
    },

    //4. Etapa de alevinaje
    fingerlings: {
        //Resumen
        totalCost: {},
        unitCost: {},

        //Costos variables
        totalVarCost: {},
        rawMaterials: {},
        workforce: {},
        indirectCosts: {},
    },

    //5. Embalaje
    packaging: {
        //Resumen
        totalCost: {},
        unitCost: {},

        //Costos variables
        totalVarCost: {},
        rawMaterials: {},
        workforce: {},
        indirectCosts: {},
    },

    //6. Costos y gastos fijos
    bills: {},
    //notas
    notes: { type: String },

})

module.exports = mongoose.model('Cost', CostSchema);
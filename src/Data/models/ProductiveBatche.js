const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductiveBatcheSchema = new Schema({
    //Información general del lote
    idSystem: { type: String, required: true }, //*por defecto

    creation: {
        reprodDate: { type: Date, required: true }, //*por defecto
        userId: { type: String, required: true }, //*por defecto
        createDate: { type: Date, required: true, default: () => Date.now() }
    },

    specie: { type: String, required: true },

    notes: { type: String },

    //1. Etapa de reproducción. Etapa de inicio del proceso**
    reproduction: {
        broodstockponds: [{
            date: { type: Date },
            idPond: { type: Schema.Types.ObjectId, ref: "Pond" },
            nFemales: { type: Number },
            nMales: { type: Number },
            nFemalesFer: { type: Number },
            nMalesFer: { type: Number },
        }],
        spawnerponds: [{
            idPond: { type: String },
            nFemales: {},
            nMales: {},
            weightFemales: {},
            weightMales: {},
            hormone: {
                typeHormone: {},
                amountHorome: {},
                syringes: {},
            },
            Eggs: {
                litersEggs: {},
                numberEggs: {},
            },

            laborForce: {}
        }]
    },

    //2. Etapa de ovicultura
    oviculture: {
        date: { type: Date },
        pondsCollections: [{
            idPond: { type: String },
            hatchedEggs: {},
            fertileEggs: {},
            hatchedEggs: {},
            laborForce: {},
        }]

    },
    //3. Etapa de larvicultura
    larviculture: {

        date: { type: Date },

        pondsCollections: [{
            initialLarvae: {},
            postlarvae: {},
            liveFood: {},
            laborForce: {},
        }]
    },

    //4. Etapa de alevinaje
    fingerlings: {
        date: { type: Date },

        pondsCollections: [{
            initialFingerlings: {},
            finalFingerlings: {},
            cal: {},
            food: {},
            fertilizer: {},
            laborForce: {},
        }]
    },

    //5. Embalaje
    packaging: {
        packingCollections: [{
            date: { type: Date },
            initialFingerlings: {},
            packedFingerlings: {
                sizeA: {},
                sizeB: {},
                total: {},
            },

            supplies: {
                boxs: {},
                bags: {},
            }

        }]
    },
    repopulation: {
        customers: {},
        destination: {},
        laboralForce: {},
    },

    //**"Existe la posibilidad de crear nuevas etapas de levante y ceba"
    cost: {

    }

})

module.exports = mongoose.model('ProductiveBatche', ProductiveBatcheSchema);
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
            date: { type: Date },
            idPond: { type: String, ref: "Pond" },
            nFemales: {},
            nMales: {},
            weightFemales: {},
            weightMales: {},
            hormone: {
                idOutlay: { type: String, ref: "Outlay" },
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
    ovoculture: {
        pondsCollections: [{
            date: { type: Date },
            idPond: { type: String, ref: "Pond" },
            initialEggs: {},
            fertileEggs: {},
            hatchedEggs: {},
            laborForce: {},
        }]

    },
    //3. Etapa de larvicultura
    larviculture: {
        pondsCollections: [{
            idPond: { type: String, ref: "Pond" },
            date: { type: Date },
            initialLarvae: {},
            postlarvae: {},
            liveFood: {
                idOutlay: { type: String, ref: "Outlay" }

            },
            laborForce: {},
        }]
    },

    //4. Etapa de alevinaje
    fingerlings: {

        pondsCollections: [{
            date: { type: Date },
            idPond: { type: String, ref: "Pond" },
            initialFingerlings: {},
            finalFingerlings: {},
            cal: {
                idOutlay: { type: String, ref: "Outlay" }
            },
            food: {
                idOutlay: { type: String, ref: "Outlay" }
            },
            fertilizer: {
                idOutlay: { type: String, ref: "Outlay" }
            },
            laborForce: {
                idOutlay: { type: String, ref: "Outlay" }
            },
        }]
    },

    //5. Embalaje
    packaging: {
        packingCollections: [{
            idPond: { type: String, ref: "Pond" },
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
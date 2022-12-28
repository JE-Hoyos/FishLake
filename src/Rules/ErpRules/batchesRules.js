const Pond = require('../../Data/models/Pond.js');
const Batche = require('../../Data/models/ProductiveBatche.js');
const System = require('../../Data/models/System.js');
require('dotenv').config();

const BatchesRules = {

    callBatches: async(req, res) => {
        //Capturar id de sistema
        const idSystem = req.user.idSystem.id;
        //consultar lotes
        const batches = await Batche.find({ idSystem: idSystem });
        //Consultar ajustes de sistema
        const settings = await System.findById(idSystem, [
            'costCenters',
            'species',
            'costCenters'
        ]);
        //Consultar estanques
        const ponds = await Pond.find({ idSystem: idSystem });
        //Construir objeto respuesta
        const object = {
            batches,
            settings
        };
        //Respuesta
        res.render('./ErpViews/ProductiveBatches.ejs', { object });
    },

    createNewBatche: async(req, res) => {
        try {
            //captura de variables
            const idSystem = req.user.idSystem.id;
            const creation = {
                reprodDate: req.body.reprodDate,
                userId: req.user._id,
            };
            const specie = req.body.specie;
            const notes = req.body.notes;
            //Instanciar Lote
            const newBatche = new Batche({
                idSystem,
                creation,
                specie,
                notes
            });

            //registrar lote
            await newBatche.save();
            //Respuesta
            res.redirect('/callBatches')

        } catch (e) {
            req.flash('signUpErr', 'err')
            res.redirect('/Profile_system')
        }
    },

    callBatcheProfile: async(req, res) => {
        try {
            //capturar id de lote
            const id = req.params['id']
                //Consultar lote
            const batche = await Batche.findById({ _id: id }).populate({ path: 'reproduction.broodstockponds.idPond', select: 'name' });
            //Consultar estanques
            const idSys = req.user.idSystem
            const ponds = await Pond.find({ idSystem: idSys })
            console.log(batche.reproduction)
                //Respuesta
            res.render('./ErpViews/batcheProfile.ejs', { batche, ponds })
        } catch (e) {

            req.flash('signUpErr', 'err')
            res.redirect('/callBatches');

        }

    },

    broodstockFishingEdit: async(req, res) => {
        const {
            idBatche,
            reprodDate,
            pond,
            nFemales,
            nMales,
            nFemalesFer,
            nMalesFer,
        } = req.body

        if (!reprodDate) {

        } else {


            await Batche.findByIdAndUpdate(idBatche, {
                $push: {
                    'reproduction.broodstockponds': {
                        date: reprodDate,
                        idPond: pond,
                        nFemales: nFemales,
                        nMales: nMales,
                        nFemalesFer: nFemalesFer,
                        nMalesFer: nMalesFer
                    }
                }

            });

            res.redirect(`/batcheProfile/${idBatche}`);
        }
    }
}


module.exports = { BatchesRules }
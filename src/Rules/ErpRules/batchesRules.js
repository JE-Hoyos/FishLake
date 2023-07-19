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
        // try {
        //capturar id de lote
        const id = req.params['id']
            //Consultar lote
        const batche = await Batche.findById({ _id: id }).
        populate({ path: 'reproduction.broodstockponds.idPond', select: 'name' }).
        populate({ path: 'reproduction.spawnerponds.idPond', select: 'name' }).
        populate({ path: 'ovoculture.pondsCollections.idPond', select: 'name' }).
        populate({ path: 'larviculture.pondsCollections.idPond', select: 'name' })
            //Consultar estanques
        const idSys = req.user.idSystem
        const ponds = await Pond.find({ idSystem: idSys })
        console.log(batche.reproduction)

        //Respuesta
        res.render('./ErpViews/batcheProfile.ejs', { batche, ponds })

        //  } catch (e) {

        // req.flash('signUpErr', 'err')
        // res.redirect('/callBatches');

        //}

    },

    //Fase de reproducción
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
    },

    broodstockFishingRemove: async(req, res) => {

        const {
            idBatche,
            idBroodstockponds,
            index,
        } = req.body

        await Batche.findByIdAndUpdate(idBatche, {
            $pull: {
                'reproduction.broodstockponds': {
                    _id: idBroodstockponds
                }
            }

        });

        res.redirect(`/batcheProfile/${idBatche}`);

    },

    broodstockInductionBatche: async(req, res) => {
        const {
            pond,
            indDate,
            nFemales,
            weightFemales,
            nMales,
            weightMales,
            eggs,
            hormoneName,
            hormoneAmount,
            syringes,
            idBatche
        } = req.body

        await Batche.findByIdAndUpdate(idBatche, {
            $push: {
                'reproduction.spawnerponds': {
                    date: indDate,
                    idPond: pond,
                    nFemales,
                    nMales,
                    weightFemales,
                    weightMales,
                    hormone: {
                        typeHormone: hormoneName,
                        amountHorome: hormoneAmount,
                        syringes,
                    },
                    Eggs: {
                        litersEggs: eggs,
                    },
                }
            }
        });
        res.redirect(`/batcheProfile/${idBatche}`);
    },

    broodstockInductionRemove: async(req, res) => {

        const {
            idBatche,
            idspawnerponds,
            index,
        } = req.body

        await Batche.findByIdAndUpdate(idBatche, {
            $pull: {
                'reproduction.spawnerponds': {
                    _id: idspawnerponds
                }
            }

        });

        res.redirect(`/batcheProfile/${idBatche}`);

    },

    //Ovicultura
    ovocultureEdit: async(req, res) => {
        const {
            idBatche,
            pond,
            ovoDate,
            initialEggs,
            fertileEggs,
            hatchedEggs,

        } = req.body

        await Batche.findByIdAndUpdate(idBatche, {
            $push: {
                'ovoculture.pondsCollections': {
                    date: ovoDate,
                    idPond: pond,
                    initialEggs,
                    fertileEggs,
                    hatchedEggs,
                }
            }
        });

        res.redirect(`/batcheProfile/${idBatche}`);
    },

    ovocultureRemove: async(req, res) => {

        const {
            idBatche,
            idpond,
            index,
        } = req.body

        await Batche.findByIdAndUpdate(idBatche, {
            $pull: {
                'ovoculture.pondsCollections': {
                    _id: idpond
                }
            }

        });

        res.redirect(`/batcheProfile/${idBatche}`);

    },
    //larvicultura
    larvicultureEdit: async(req, res) => {
        const {
            idBatche,
            idPond,
            date,
            initialLarvae,
            postlarvae,
            liveFood,
        } = req.body

        await Batche.findByIdAndUpdate(idBatche, {
            $push: {
                'larviculture.pondsCollections': {
                    date,
                    idPond,
                    initialLarvae,
                    postlarvae,
                    liveFood,

                }
            }
        });

        res.redirect(`/batcheProfile/${idBatche}`);
    },

    larvicultureRemove: async(req, res) => {

        const {
            idBatche,
            idpond,
            index,
        } = req.body

        await Batche.findByIdAndUpdate(idBatche, {
            $pull: {
                'larviculture.pondsCollections': {
                    _id: idpond
                }
            }

        });

        res.redirect(`/batcheProfile/${idBatche}`);

    },





}


module.exports = { BatchesRules }
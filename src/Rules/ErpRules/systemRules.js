const System = require('../../Data/models/System.js');
require('dotenv').config();


const SystemRules = {

    readSystem: async(req, res) => {
        //leer información del systema
        const system = await System.findById(req.user.idSystem.id)

        //Responder con información
        res.render('./ErpViews/ProfileSystem.ejs', { system: system })
    },

    addSpecie: async(req, res) => {

        try {
            const { comunSpecie, scientSpecie } = req.body
            await System.findByIdAndUpdate(req.user.idSystem.id, {
                $push: {
                    species: {
                        comunSpecie,
                        scientSpecie
                    }
                }
            })

            req.flash('successMessage', 'success');
            res.redirect('/Profile_system')

        } catch (e) {
            req.flash('signUpErr', 'err')
            res.redirect('/callColabs');
        }


    },

    //Agregar centros de costos
    addCenter: async(req, res) => {
        try {
            const { nameCostCenters, descript } = req.body
            await System.findByIdAndUpdate(req.user.idSystem.id, {
                $push: {
                    costCenters: {
                        nameCostCenters,
                        descript
                    }
                }
            })

            req.flash('successMessage', 'success');
            res.redirect('/Profile_system')

        } catch (e) {
            req.flash('signUpErr', 'err')
            res.redirect('/callColabs');
        }


    }

}






module.exports = { SystemRules }
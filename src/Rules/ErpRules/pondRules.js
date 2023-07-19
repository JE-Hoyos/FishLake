const Pond = require('../../Data/models/Pond.js');
require('dotenv').config();

const PondsRules = {

    callPonds: async(req, res) => {
        const user = req.user;
        const ponds = await Pond.find({ 'idSystem.id': user.idSystem.id });
        res.render('./ErpViews/Ponds.ejs', { ponds })

    },

    createNewPond: async(req, res) => {

        try { //capturar variables de formulario
            const { name, typePond, material, area, depth } = req.body

            //Instanciar estanque
            const pond = new Pond({
                idSystem: {
                    id: req.user.idSystem.id,
                    name: req.user.idSystem.name
                },
                typePond: typePond,
                name: name,
                features: {
                    material: material,
                    area: area,
                    depth: depth,
                    vol: (area * depth),
                }
            });

            //Guardar datos
            await pond.save();
            //mensaje exito
            req.flash('successMessage', 'success');
            //renderizar vista
            res.redirect('/callPonds');
        } catch (e) {

            req.flash('signUpErr', 'err')
            res.redirect('/Profile_system');
        }
    }
}


module.exports = { PondsRules }
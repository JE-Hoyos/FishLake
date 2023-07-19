const User = require('../../Data/models/User.js');
require('dotenv').config();


const ColabsRules = {
    //Crear colaboradores
    createNewColab: async(req, res) => {
        try {
            //Información de usuario
            const {
                firstname,
                lastname,
                profession,
                position,
                gender,
                email,
                telphone,
                passone,
                passconfirm
            } = req.body;

            //Permisos (roles)
            const {
                newColabs,
                storeAndShopping,
                ponds,
                batches,
                sales,
                customers,
                costs
            } = req.body;


            if (passone === passconfirm) {

                const user = new User({
                    userType: "Colab",
                    name: firstname,
                    family_name: lastname,
                    gender: gender,
                    position: position,
                    profession: profession,
                    email: email,
                    telphone: telphone,
                    encryptedPass: passone,

                    idSystem: {
                        id: req.user.idSystem.id,
                        name: req.user.idSystem.name
                    },

                    permissions: {
                        newColabs: newColabs,
                        storeAndShopping: storeAndShopping,
                        ponds: ponds,
                        batches: batches,
                        sales: sales,
                        customers: customers,
                        costs: costs
                    }
                });

                //Encriptado de contraseña
                user.encryptedPass = await user.encryptPassword(user.encryptedPass);

                //Guardar datos
                await user.save();

                //mensaje exito
                req.flash('successMessage', 'success');
                res.redirect('/callColabs');


            } else {
                //mensaje exito
                req.flash('signUpErr', 'errPass')
                res.redirect('/callColabs');
            }
        } catch (e) {

            req.flash('signUpErr', 'err')
            res.redirect('/callColabs');
        }
    },
    // llamar colaboradores
    callColabs: async(req, res) => {
        const user = req.user;
        const colabs = await User.find({ 'idSystem.id': user.idSystem.id });
        res.render('./ErpViews/colabs.ejs', { colabs })
    }



}


module.exports = { ColabsRules }
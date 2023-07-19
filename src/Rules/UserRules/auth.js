const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../../Data/models/User.js');
const System = require('../../Data/models/System.js');
require('dotenv').config();

const sessions = require('express-session');

//Aplicación de passport- estrategía local para crear usuario e iniciar sesion

//Serializado de datos
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//Deserializado de datos
passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
})


//Creación de nuevos usuarios
passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'passone',
    passReqToCallback: true

}, async(req, email, password, done) => {

    const {
        firstname,
        lastname,
        gender,
        position,
        professional,
        telphone,
        passone,
        passconfirm
    } = req.body

    //validar existencia de usuario
    validUser = await User.findOne({ email: email })

    //si existe- no registrar
    if (validUser) {
        return done(null, false, req.flash('signUpErr', 'El usuario ya existe'))
    } else {

        //si la contraseñas coinciden -guardar
        if (passone === passconfirm) {

            const user = new User({
                    userType: "Master",
                    name: firstname,
                    family_name: lastname,
                    gender: gender,
                    position: position,
                    profession: professional,
                    email: email,
                    telphone: telphone,
                    encryptedPass: passone
                })
                //Encriptado de contraseña
            user.encryptedPass = await user.encryptPassword(user.encryptedPass);

            //Guardar datos
            await user.save();

            // Callback
            done(null, user);

        } else {
            return done(null, false, req.flash('signUpErr', 'contraseñas no coinciden'))

        }

    }

}));


// Inicio de sesion 

passport.use('local-signIn', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    //consulta
    const user = await User.findOne({ email: email })
        //si no existe el usuario
    if (!user) {
        return done(null, false, req.flash('signInErr', 'usuario no existe'))
    } else {

        const validPass = await user.comparePassword(password, user.encryptedPass)

        if (!validPass) {
            return done(null, false, req.flash('signInErr', 'contraseña invalida'))
        } else {
            done(null, user)
        }

    }
}));

//Crear sistema productivo

const createSystem = async(req, res) => {

    //capturar datos de formulario
    const { nameSystem, country, departament, lon, lat, descript } = req.body;
    const userId = req.user._id;
    //Instanciar el objeto system
    const system = new System({
        idUserMaster: userId,
        name: nameSystem,
        location: {
            country: country,
            department: departament,
            latitude: lon,
            longitude: lat,
        },
        descript: descript

    })

    //Guardar un nuevo sistema
    await system.save();

    const idSystemUser = {
        id: system._id,
        name: system.name
    }

    //Editar el usuario
    await User.findByIdAndUpdate(userId, {
        idSystem: {
            id: system._id,
            name: system.name
        }
    });

    //Responder con la nueva vista del sistema
    res.redirect('./Profile');
};

module.exports = { createSystem }
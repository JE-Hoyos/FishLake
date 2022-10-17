const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../../Data/models/User');
//const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    const { firstname, lastname, gender, professional, telphone, passone, passconfirm } = req.body

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
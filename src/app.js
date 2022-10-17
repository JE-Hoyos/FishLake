const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./Data/access/mongo');
const sessions = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

require('dotenv').config();
require('./Rules/UserRules/auth.js');

//########### inicialización express#############
const app = express();

//#############  Settings  ########################

//Puerto
app.set('port', process.env.PORT || 3000);

//vistas
app.set('views', path.join(__dirname, 'Interface/views')); // cambiar

//Motor de plantillas
app.set("view engine", "ejs");
app.use(express.static(app.get('views')));


//// Middlewares

//implementar morgan
app.use(morgan('dev'));

//implementar urlencode y json para aceptar datos que llegan de formularios
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// //express- sessions
app.use(sessions({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
}));

//Flash
app.use(flash());

//Passport-auth
app.use(passport.initialize());
app.use(passport.session());

//mensajes de autentificación
app.use((req, res, next) => {
    app.locals.signUpErr = req.flash('signUpErr');
    app.locals.signInErr = req.flash('signInErr');
    app.locals.user = req.user;
    next();
});




//################# Routes ###################################
// user services
app.use(require(path.join(__dirname, './Routes/UserRoutes/views.js')));
app.use(require(path.join(__dirname, './Routes/UserRoutes/auth.js')));


//erp services
app.use(require(path.join(__dirname, './Routes/EprRoutes/views.js')));

//################ Static files ##############################
app.use(express.static(path.join(__dirname, 'Interface/public')));

//export
module.exports = app;
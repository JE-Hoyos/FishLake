const express = require('express');
const morgan = require('morgan');
const path = require('path');

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

//implementar morgan
app.use(morgan('dev'));

//implementar urlencode y json para aceptar datos que llegan de formularios
app.use(express.urlencoded({ extended: false })) //solo datos json


//################# Routes ###################################
//app.use(require(path.join(__dirname, 'Services/ejemplo.js'))); //poner rutas



//################ Static files ##############################
app.use(express.static(path.join(__dirname, 'Interface/public'))); //cambiar rutas

//export
module.exports = app;
const { Router } = require("express");
const router = Router();

//vist home page
router.get('/', (req, res) => {
    res.render('./UserViews/index')
});

//Vist form new user
router.get('/FormNewUser', (req, res) => {
    res.render('./UserViews/UserForm')
});


//Visit system profile
router.get('/SystemProfile', (req, res) => {
    res.render('./UserViews/SystemProfile')
});


// create system
router.get('/SystemForm', (req, res) => {
    res.render('./UserViews/SystemForm')
});

module.exports = router;
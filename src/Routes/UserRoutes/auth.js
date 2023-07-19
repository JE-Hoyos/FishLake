const { Router } = require("express");
const router = Router();
const passport = require('passport');
const { isAuthenticated } = require('../../Rules/UserRules/middlewares/authToken.js');
const { createSystem } = require('../../Rules/UserRules/auth')

router.post('/SignUp', passport.authenticate('local-signup', {
    successRedirect: '/Profile',
    failureRedirect: '/FormNewUser',
    passReqToCallback: true
}));

router.post('/SignIn', passport.authenticate('local-signIn', {
    successRedirect: '/Profile',
    failureRedirect: '/',
    passReqToCallback: true
}));


router.get('/Profile', isAuthenticated, (req, res) => {
    req.flash('user', req.user);
    res.render('./UserViews/UserProfile');
});


router.get('/LogOut', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


// create system
router.post('/Create-system', isAuthenticated, createSystem);

module.exports = router;
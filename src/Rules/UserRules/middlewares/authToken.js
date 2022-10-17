const passport = require('passport');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/')
    }
}

module.exports = { isAuthenticated }
const permissions = {

    master: async(req, res, next) => {
        if (req.user.userType = "Master") {
            next();
        }
    },

    newColabs: async(req, res, next) => {

        if (req.user.userType = "Master") {
            next();
        } else {
            if (req.user.permissions.newColabs = "true") {
                next();
            }
        }
    },
    storeAndShopping: async(req, res, next) => {
        if (req.user.userType = "Master") {
            next();
        } else {
            if (req.user.permissions.storeAndShopping = "true") {
                next();
            }
        }
    },
    ponds: async(req, res, next) => {
        if (req.user.userType = "Master") {
            next();
        } else {
            if (req.user.permissions.ponds = "true") {
                next();
            }
        }
    },
    batches: async(req, res, next) => {
        if (req.user.userType = "Master") {
            next();
        } else {
            if (req.user.permissions.batches = "true") {
                next();
            }
        }
    },
    sales: async(req, res, next) => {
        if (req.user.userType = "Master") {
            next();
        } else {
            if (req.user.permissions.sales = "true") {
                next();
            }
        }
    },
    customers: async(req, res, next) => {
        if (req.user.userType = "Master") {
            next();
        } else {
            if (req.user.permissions.customers = "true") {
                next();
            }
        }
    },

    costs: async(req, res, next) => {
        if (req.user.userType = "Master") {
            next();
        } else {
            if (req.user.permissions.costs = "true") {
                next();
            }
        }
    },

};


module.exports = { permissions };
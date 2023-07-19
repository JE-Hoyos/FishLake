const Outlay = require('../../Data/models/Outlay.js');
const { PUC } = require('../../utils/puc.js');

const OutlaysRules = {
    callOutlay: async(req, res) => {
        const user = req.user;
        const outlays = await Outlay.find({ 'idSystem.id': user.idSystem.id })

        console.log(PUC)
        res.render('./ErpViews/outlays.ejs', { outlays, PUC });
    },

    postOutlay: async(req, res) => {

    },



};


module.exports = { OutlaysRules }
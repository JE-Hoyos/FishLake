const { Router } = require("express");
const router = Router();

router.get('/PondForm', (req, res) => {
    res.render('./ErpViews/PondForm')
});


router.get('/Batche', (req, res) => {
    res.render('./ErpViews/ReproductionForm')
});

router.get('/OutlayForm', (req, res) => {
    res.render('./ErpViews/OutlayForm')
});


module.exports = router;
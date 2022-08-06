const { Router } = require("express");
const router = Router();

//vist home page
router.get('/', (req, res) => {
    res.render('./UserManager/index')
});

module.exports = router;
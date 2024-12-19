const { Router } = require("express");
const router = Router();

const unidades=require("./informacionRouter");

router.use('/unidades',unidades);

module.exports = router;
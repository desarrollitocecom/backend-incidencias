const { Router } = require("express");
const router = Router();

const informacion=require("./informacionRouter");

router.use('/informacion',informacion);

module.exports = router;
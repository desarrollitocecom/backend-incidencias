// routes/authRouter.js
const { Router } = require("express");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const { loginHandler, loginFaceHandler } = require("../handlers/authHandler");

const router = Router();

router.post("/login", loginHandler);
router.post("/login/face", upload.single("file"), loginFaceHandler);

module.exports = router;

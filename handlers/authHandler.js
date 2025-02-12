// handlers/authHandler.js
const sharp = require("sharp");
const { loginUser, loginFace } = require("../controllers/authController");
const fs = require("fs");
const path = require("path");

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email y contraseña son requeridos" });
  }
  try {
    const data = await loginUser(email, password);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en loginHandler:", error.message);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error interno del servidor",
    });
  }
};

const loginFaceHandler = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        statusCode: 400,
        error: "Debes subir un archivo.",
      });
    }

    const imageBuffer = await sharp(file.buffer, { failOn: "truncated" })
      .rotate()
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();

    const fileBase64 = imageBuffer.toString("base64");
    const data = await loginFace(fileBase64);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error, "sip");
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Error interno del servidor",
    });
  }
};

module.exports = { loginHandler, loginFaceHandler };

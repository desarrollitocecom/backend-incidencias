require("dotenv").config();
const express = require("express");
const http = require("http");
const { sequelize } = require("./db_connection");
const router = require("./routes/index");
const { PORT_INCIDENCIAS } = process.env;
const { initializeSocket, userSockets } = require("./sockets");
//const loginMiddleware = require("./checkers/validateToken");
// const usuariosRouter = require("./routes/loginRouter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/login", usuariosRouter); // no aplica authMiddleware para el manejo de usuarios
//app.use(loginMiddleware); // usa el middleware globalmente para validar todas las rutas a las que se va a acceder en el sistema solo estando logeado
const server = http.createServer(app); // servidor http a partir de express

initializeSocket(server); // Inicializamos Socket.io

app.use("/api", router);

app.get("/", async (req, res) => {
  res.json({
    message: "El servidor esta funcionando!",
    data: "Gracias por usar el servidor!",
  });
});

server.listen(PORT_INCIDENCIAS, () => {
  console.log(`INCIDENCIAS Server is running on port ${PORT_INCIDENCIAS}`);
  console.log(process.env.INCIDENCIAS_URL);
  sequelize
    .sync({ alter: true }) // cambiar de alter a force para que se borren las tablas y se creen de nuevo, hasta que queden bien diseñadas
    .then(() => console.log("Database is connected"))
    .catch((err) => console.error("Error connecting to the database:", err));
});

module.exports = { userSockets };

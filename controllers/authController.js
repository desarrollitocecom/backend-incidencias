const axios = require("axios");

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.INCIDENCIAS_URL}/api/signin`,
      {
        email,
        password,
      },
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Error en la autenticación");
  } catch (error) {
    console.error("Error en loginUser:", error.response?.data || error.message);
    throw (
      error.response?.data || { message: "Error al autenticar con Laravel" }
    );
  }
};

const loginFace = async (foto) => {
  const apiKey = process.env.API_KEY;
  const url_sis_incidencia = process.env.INCIDENCIAS_URL;

  try {
    const response = await axios.post(
      `${process.env.BACK_TAREAJE_FACE_URL}/axxon/face`,
      {
        foto: foto,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      },
    );

    if (response.status === 200) {
      const dataTareaje = response.data.data;
      const sereno = await axios.get(
        `${url_sis_incidencia}/api/sereno/${dataTareaje.dni}`,
      );

      const cargosSereno = await axios.get(
        `${url_sis_incidencia}/api/cargo_sereno`,
      );

      let data = {
        ...dataTareaje,
      };

      const serenoData = sereno.data.data;
      const cargosSerenoData = cargosSereno.data.data;

      if (serenoData.length === 0) {
        throw new Error("Usuario no encontrado");
      }

      const cargo_sereno = cargosSerenoData.find(
        (element) => element.id === Number(serenoData[0].cargo_sereno_id),
      );

      data.id_sereno = serenoData[0].id;
      data.cargo_sereno_id = serenoData[0].cargo_sereno_id;
      data.cargo_sereno = cargo_sereno.descripcion;
      data.habilitado = serenoData[0].habilitado;

      return {
        success: true,
        data: data,
      };
    }

    throw new Error("Error al reconocer el rostro");
  } catch (error) {
    console.error("Error en loginUser:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || error.message);
  }
};

module.exports = { loginUser, loginFace };

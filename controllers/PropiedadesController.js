const axios = require("axios");
// Cambiar por la URL real
const { INCIDENCIAS_URL } = process.env;

const getAllMedios = async () => {
  try {
    const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/medios`);
    if (status !== 200) {
      throw new Error("Error al obtener los medios");
    }

    return data;
  } catch (error) {
    console.error("Error en getAllMedios:", error);
    throw error;
  }
};
const getAllSituaciones = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/situaciones`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener los serenos");
    }

    return data;
  } catch (error) {
    console.error("Error en getAllUnidades:", error);
    throw error;
  }
};
const getAllOperadores = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/operadores `,
    );
    if (status !== 200) {
      throw new Error("Error al obtener los serenos");
    }
    return data;
  } catch (error) {
    console.error("Error en getAllUnidades:", error);
    throw error;
  }
};

module.exports = {
  getAllMedios,
  getAllSituaciones,
  getAllOperadores,
};

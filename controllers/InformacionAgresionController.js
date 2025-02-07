const axios = require("axios");
// Cambiar por la URL real
const { INCIDENCIAS_URL } = process.env;

const getAllEstadoProceso = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/estados_proceso`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener los serenos");
    }

    return data;
  } catch (error) {
    console.error("Error en getAllEstado:", error);
    throw error;
  }
};

const getAllGeneroAgresor = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/generos_agresor`,
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
const getAllGeneroVictima = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/generos_victima`,
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
const getAllSeveridadProcesos = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/severidad_procesos`,
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

const getAllSeveridades = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/severidades`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener las severidades");
    }

    return data;
  } catch (error) {
    console.error("Error en getAllseveridades:", error);
    throw error;
  }
};

module.exports = {
  getAllEstadoProceso,
  getAllGeneroAgresor,
  getAllGeneroVictima,
  getAllSeveridadProcesos,
  getAllSeveridades,
};

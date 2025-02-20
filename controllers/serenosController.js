const axios = require("axios");

const { INCIDENCIAS_URL } = process.env;

const getAllSerenos = async () => {
  try {
    const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/serenos`);
    if (status !== 200) {
      throw new Error("Error al obtener los serenos");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getSerenoByDNI = async (dni) => {
  if (!dni) throw new Error("El DNI es requerido");

  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/sereno/${dni}`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener el sereno");
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCargoSereno = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/cargo_sereno`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener los cargos de sereno");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getJurisdicciones = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/jurisdicciones`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener las jurisdicciones");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllSerenos,
  getSerenoByDNI,
  getCargoSereno,
  getJurisdicciones,
};

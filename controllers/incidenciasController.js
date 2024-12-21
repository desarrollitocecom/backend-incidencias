const axios = require("axios");

const { INCIDENCIAS_URL } = process.env;


const getIncidenciasByDNI = async (dni) => {
    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/ver_incidencias_sereno/${dni}`);
        if (status !== 200) {
            throw new Error("Error al obtener las incidencias");
        }
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

const getIncidenciaByID = async (cod_incidencia) => {
    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/ver_incidencia/${cod_incidencia}`);
        if (status !== 200) {
            throw new Error("Error al obtener la incidencia");
        }
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

const postIncidencia = async (incidencia) => {
    try {
        const { data, status } = await axios.post(`${INCIDENCIAS_URL}/api/crear_incidencia`, incidencia);
        if (status !== 200) {
            throw new Error("Error al crear la incidencia");
        }
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


module.exports = { getIncidenciasByDNI, getIncidenciaByID, postIncidencia };
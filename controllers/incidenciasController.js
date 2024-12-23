const axios = require("axios");

const { INCIDENCIAS_URL } = process.env;


const getIncidenciasByDNI = async (dni, fechaInicio = null, fechaFin = null) => {
    try {
        const params = {};

        if (fechaInicio) params.fechaInicio = fechaInicio;
        if (fechaFin) params.fechaFin = fechaFin;
        console.log("params: ",fechaInicio, fechaFin);
        console.log(`${INCIDENCIAS_URL}/api/ver_incidencias_sereno/${dni}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/ver_incidencias_sereno/${dni}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
        if (status !== 200) {
            throw new Error('Error al obtener las incidencias');
        }
        //console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

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
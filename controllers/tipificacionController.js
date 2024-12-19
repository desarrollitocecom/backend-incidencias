const axios = require('axios');

const getUnidades = async () => {

    try {

        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/ver_unidades`);
        if (status !== 200) {
            throw new Error("Error al obtener las unidades");
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

const getTipoCaso = async () => {

    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/ver_tipo_caso`);
        if (status !== 200) {
            throw new Error("Error al obtener los tipos de caso");
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

const getSubTipoCaso = async () => {

    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/ver_subtipo_caso`);
        if (status !== 200) {
            throw new Error("Error al obtener los subtipos de caso");
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

const getTipoReportante = async () => {

    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/ver_tipo_reportante`);
        if (status !== 200) {
            throw new Error("Error al obtener los tipos de reportante");
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUnidades, getTipoCaso, getSubTipoCaso, getTipoReportante };
const axios = require('axios');

const { INCIDENCIAS_URL } = process.env;

const getAllSerenos = async () => {
    try {
        //console.log("API: ",process.env);
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/serenos`);
        if (status !== 200) {
            throw new Error("Error al obtener los serenos");
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getAllSerenos };
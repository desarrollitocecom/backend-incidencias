const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs'); // Para manejar los archivos subidos

const { INCIDENCIAS_URL } = process.env;


const getIncidenciasByDNI = async (dni, fechaInicio = null, fechaFin = null) => {
    try {
        // console.log("params: ",fechaInicio, fechaFin);
        // console.log(`${INCIDENCIAS_URL}/api/ver_incidencias_sereno/${dni}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
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

const postIncidencia = async (incidencia, archivos) => {
    try {
        const formData = new FormData();

        // console.log("6");
        // console.log("incidencia: ", incidencia);
        // console.log("archivos: ", archivos);
        // Agregar datos al FormData
        Object.keys(incidencia).forEach((key) => {
            formData.append(key, incidencia[key]);
        });
        //console.log("7");
        // Agregar archivos al FormData
        if (archivos && archivos.length > 0) {
            archivos.forEach((file) => {
                formData.append('file_save[]', fs.createReadStream(file.path), file.originalname);
            });
        }
        //console.log("8");
        const { data, status } = await axios.post(
            `${INCIDENCIAS_URL}/api/crear_incidencia`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    // 'Authorization': `Bearer ${process.env.LARAVEL_API_TOKEN}` // Si es necesario
                }
            }
        );
       // console.log("9");
        if (data.success !== true) throw new Error("Error al crear la incidencia");

        return data;
    } catch (error) {
        console.error('Error al crear incidencia:', error.response?.data || error.message);
        throw error;
    }
};


module.exports = { getIncidenciasByDNI, getIncidenciaByID, postIncidencia };
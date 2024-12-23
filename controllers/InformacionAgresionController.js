const axios = require('axios');
// Cambiar por la URL real
const { INCIDENCIAS_URL } = process.env;

const getAllEstadoProceso = async () => {
  
    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/estados_proceso`);
        if (status !== 200) {
            throw new Error("Error al obtener los serenos");
        }

        const unidades = data.data
            .map(({ id, descripcion }) => ({ id, descripcion }))
          
        return unidades;
    } catch (error) {
        console.error("Error en getAllEstado:", error);
        throw error;
    }
};

const getAllGeneroAgresor = async () => {
  
    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/generos_agresor`);
        if (status !== 200) {
            throw new Error("Error al obtener los serenos");
        }

        const unidades = data.data
            .map(({ id, descripcion, habilitado }) => ({ id, descripcion, habilitado }))
          
        return unidades;
    } catch (error) {
        console.error("Error en getAllUnidades:", error);
        throw error;
    }
};
const getAllGeneroVictima = async () => {
  
    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/generos_victima`);
        if (status !== 200) {
            throw new Error("Error al obtener los serenos");
        }

        const unidades = data.data
            .map(({ id, descripcion, habilitado }) => ({ id, descripcion, habilitado }))
          

        return unidades;
    } catch (error) {
        console.error("Error en getAllUnidades:", error);
        throw error;
    }
};
const getAllSeveridadProcesos= async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/severidad_procesos`);
        if (status !== 200) {
            throw new Error("Error al obtener los serenos");
        }

        // Filtra solo los campos requeridos
        console.log(data)
        const unidadesFiltradas = data.data
            .map(({ id, descripcion, habilitado }) => ({ id, descripcion, habilitado }))
            .slice(offset, offset + limit); // Aplica la paginación

        return unidadesFiltradas;
    } catch (error) {
        console.error("Error en getAllUnidades:", error);
        throw error;
    }
};
const getAllSeveridades= async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const { data, status } = await axios.get(`${INCIDENCIAS_URL}/api/severidades`);
        if (status !== 200) {
            throw new Error("Error al obtener los severidades");
        }

        const unidadesFiltradas = data.data
            .map(({ id, descripcion, habilitado }) => ({ id, descripcion, habilitado }))
            .slice(offset, offset + limit); // Aplica la paginación

        return unidadesFiltradas;
    } catch (error) {
        console.error("Error en getAllSeveridades:", error);
        throw error;
    }
};




module.exports = { 
    getAllEstadoProceso,
    getAllGeneroAgresor,
    getAllGeneroVictima,
    getAllSeveridadProcesos,
    getAllSeveridades
 };
const { Incidencia } = require('../db_connection');
const path = require('path');

const getAllPreIncidencias = async () => {
    try {
        const incidencias = await Incidencia.findAll();
        return incidencias;
    } catch (error) {
        console.error('Error al obtener todas las incidencias:', error.message);
        throw new Error('No se pudieron obtener las incidencias');
    }
};

const getPreIncidenciaById = async (id) => {
    try {
        const incidencia = await Incidencia.findByPk(id);
        if (!incidencia) {
            throw new Error('Incidencia no encontrada');
        }
        return incidencia;
    } catch (error) {
        console.error(`Error al obtener incidencia con ID ${id}:`, error.message);
        throw new Error('No se pudo obtener la incidencia especificada');
    }
};

const createPreIncidencia = async (incidenciaData) => {
    try {
        const nuevaIncidencia = await Incidencia.create(incidenciaData);
        return nuevaIncidencia;
    } catch (error) {
        console.error('Error al crear una nueva incidencia:', error.message);
        throw new Error('No se pudo crear la incidencia');
    }
};

const updatePreIncidencia = async (id, incidenciaData) => {
    try {
        const incidencia = await Incidencia.findByPk(id);
        if (!incidencia) {
            throw new Error('Incidencia no encontrada');
        }
        await incidencia.update(incidenciaData);
        return incidencia;
    } catch (error) {
        console.error(`Error al actualizar la incidencia con ID ${id}:`, error.message);
        throw new Error('No se pudo actualizar la incidencia');
    }
};

const deletePreIncidencia = async (id) => {
    try {
        const incidencia = await Incidencia.findByPk(id);
        if (!incidencia) {
            throw new Error('Incidencia no encontrada');
        }
        await incidencia.destroy();
        return { message: 'Incidencia eliminada correctamente' };
    } catch (error) {
        console.error(`Error al eliminar la incidencia con ID ${id}:`, error.message);
        throw new Error('No se pudo eliminar la incidencia');
    }
};

const getPhotoPreIncidencia = async (name) => {
    const foto_path = process.env.FOTOS_RUTA_PREINCIDENCIA;
    const filePath = path.join(foto_path, 'preincidencias', 'fotos', name);
    return filePath;
};

module.exports = { getAllPreIncidencias, getPreIncidenciaById, createPreIncidencia, updatePreIncidencia, deletePreIncidencia, getPhotoPreIncidencia };

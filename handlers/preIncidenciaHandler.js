const fs = require('fs');

const { getAllPreIncidencias, getPreIncidenciaById, createPreIncidencia, updatePreIncidencia, deletePreIncidencia, getPhotoPreIncidencia } = require('../controllers/preIncidenciaController');

const getAllPreIncidenciasHandler = async (req, res) => {
    try {
        const incidencias = await getAllPreIncidencias();
        res.status(200).json({ success: true, data: incidencias });
    } catch (error) {
        console.error('error en getAllPreIncidenciaHandler:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getPreIncidenciaByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const incidencia = await getPreIncidenciaById(id);
        res.status(200).json({ success: true, data: incidencia });
    } catch (error) {
        console.error('error en createPreIncidenciaHandler:', error.message);
        res.status(404).json({ error: error.message });
    }
};

const createPreIncidenciaHandler = async (req, res) => {
    try {
        const incidencia = {
            ...req.body,
        };

        const archivos = req.files;
        incidencia.fotos = [];
        for (const archivo of archivos) {
            const startIndex = archivo.path.indexOf('preincidencias');
            if (startIndex !== -1) {
                const relativePath = archivo.path.substring(startIndex).replace(/\\/g, '/');
                incidencia.fotos.push(relativePath);
            } else {
                incidencia.fotos.push(archivo.path.replace(/\\/g, '/'));
            }
        }

        if (!incidencia) {
            return res.status(400).json({ message: 'La información de la incidencia es requerida' });
        }
        const nuevaIncidencia = await createPreIncidencia(incidencia);
        if (!nuevaIncidencia) {
            return res.status(500).json({ message: 'Error al crear la incidencia' });
        }
        return res.status(201).json(nuevaIncidencia);

    } catch (error) {
        console.error('Error al crear la incidencia:', error.message);
        res.status(500).json({
            error: 'Error interno del servidor al crear la incidencia',
            details: error.message
        });
    }
};

const updatePreIncidenciaHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const incidenciaData = req.body;
        const updatedIncidencia = await updatePreIncidencia(id, incidenciaData);
        res.status(200).json({ success: true, data: updatedIncidencia });
    } catch (error) {
        console.error('error en updatePreIncidenciaHandler:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const deletePreIncidenciaHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deletePreIncidencia(id);
        res.status(200).json({ success: true, message: result.message });
    } catch (error) {
        console.error('error en deletePreIncidenciaHandler:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const getPhotoPreIncidenciaHandler = async (req, res) => {
    const { name } = req.params;
    try {
        const filePath = await getPhotoPreIncidencia(name);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'La foto no existe en el servidor' });
        }

        res.sendFile(filePath);
    } catch (error) {
        console.error('Error en getPhotoPreIncidenciaHandler:', error.message);
        res.status(404).json({ error: 'Foto no encontrada' });
    }
};

module.exports = {
    getAllPreIncidenciasHandler,
    getPreIncidenciaByIdHandler,
    createPreIncidenciaHandler,
    updatePreIncidenciaHandler,
    deletePreIncidenciaHandler,
    getPhotoPreIncidenciaHandler
};

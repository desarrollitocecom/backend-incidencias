const { getAllPreIncidencias, getPreIncidenciaById, createPreIncidencia, updatePreIncidencia, deletePreIncidencia } = require('../controllers/preIncidenciaController');

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
        const incidenciaData = req.body;
        const nuevaIncidencia = await createPreIncidencia(incidenciaData);
        res.status(201).json({ success: true, data: nuevaIncidencia });
    } catch (error) {
        console.error('error en createPreIncidenciaHandler:', error.message);
        res.status(400).json({ error: error.message });
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

module.exports = {
    getAllPreIncidenciasHandler,
    getPreIncidenciaByIdHandler,
    createPreIncidenciaHandler,
    updatePreIncidenciaHandler,
    deletePreIncidenciaHandler
};

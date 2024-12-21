// handlers/incidenciasHandler.js

const { getIncidenciasByDNI, getIncidenciaByID, postIncidencia } = require('../controllers/incidenciasController');

// Handler para obtener incidencias por DNI
const getIncidenciasByDNIHandler = async (req, res) => {
    const { dni } = req.params;

    if (!dni) {
        return res.status(400).json({ message: 'El DNI es requerido' });
    }

    try {
        const incidencias = await getIncidenciasByDNI(dni);

        if (!incidencias || incidencias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron incidencias para el sereno con el DNI proporcionado' });
        }

        res.status(200).json({
            message: 'Incidencias obtenidas correctamente',
            data: incidencias.data.map(incidencia => ({
                id: incidencia.id,
                codigo_incidencia: incidencia.codigo_incidencia,
                // tipo_caso_id: incidencia.tipo_caso_id,
                sub_tipo_caso_id: incidencia.sub_tipo_caso_id,
                // cargo_sereno_id: incidencia.cargo_sereno_id, // CARGO DEL SERENO " NOMBRE"
                // sereno_id : incidencia.sereno_id, // nombre del sereno
                jurisdiccion_id: incidencia.jurisdiccion_id, // nombre de la jurisdiccion
                fecha: incidencia.fecha_ocurrencia,
                hora: incidencia.hora_ocurrencia,
            }))
        });
    } catch (error) {
        console.error('Error al obtener incidencias por DNI:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener las incidencias' });
    }
};

// Handler para obtener una incidencia por su ID
const getIncidenciaByIDHandler = async (req, res) => {

    const { cod_incidencia } = req.params;

    if (!cod_incidencia) {
        return res.status(400).json({ message: 'El código de incidencia es requerido' });
    }

    try {
        const incidencia = await getIncidenciaByID(cod_incidencia);

        if (!incidencia) {
            return res.status(404).json({ message: 'Incidencia no encontrada' });
        }

        res.status(200).json({
            message: 'Incidencia obtenida correctamente',
            data: incidencia
        });
    } catch (error) {
        console.error('Error al obtener incidencia por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener la incidencia' });
    }
};

// Handler para crear una nueva incidencia
const postIncidenciaHandler = async (req, res) => {
    const incidencia = req.body;

    if (!incidencia) {
        return res.status(400).json({ message: 'La información de la incidencia es requerida' });
    }

    try {
        const nuevaIncidencia = await postIncidencia(incidencia);

        if (!nuevaIncidencia) {
            return res.status(500).json({ message: 'Error al crear la incidencia' });
        }

        res.status(201).json({
            message: 'Incidencia creada correctamente',
            data: nuevaIncidencia
        });
    } catch (error) {
        console.error('Error al crear la incidencia:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear la incidencia' });
    }
};

module.exports = {
    getIncidenciasByDNIHandler,
    getIncidenciaByIDHandler,
    postIncidenciaHandler
};

const { getUnidades, getTipoCaso, getSubTipoCaso, getTipoReportante } = require('../controllers/tipificacionController');

const getUnidadesHandler = async (req, res) => {
    try {
        const unidades = await getUnidades();
        res.status(200).json({
            message: 'Unidades obtenidas correctamente',
            data: unidades
        });
    } catch (error) {
        console.error('Error al obtener unidades:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener las unidades' });
    }
};

const getTipoCasoHandler = async (req, res) => {
    try {
        const tiposCaso = await getTipoCaso();
        res.status(200).json({
            message: 'Tipos de caso obtenidos correctamente',
            data: tiposCaso
        });
    } catch (error) {
        console.error('Error al obtener tipos de caso:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los tipos de caso' });
    }
};

const getSubTipoCasoHandler = async (req, res) => {
    try {
        const subtiposCaso = await getSubTipoCaso();
        res.status(200).json({
            message: 'Subtipos de caso obtenidos correctamente',
            data: subtiposCaso
        });
    } catch (error) {
        console.error('Error al obtener subtipos de caso:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los subtipos de caso' });
    }
};

const getTipoReportanteHandler = async (req, res) => {
    try {
        const tiposReportante = await getTipoReportante();
        res.status(200).json({
            message: 'Tipos de reportante obtenidos correctamente',
            data: tiposReportante
        });
    } catch (error) {
        console.error('Error al obtener tipos de reportante:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los tipos de reportante' });
    }
};

module.exports = {
    getUnidadesHandler,
    getTipoCasoHandler,
    getSubTipoCasoHandler,
    getTipoReportanteHandler
};

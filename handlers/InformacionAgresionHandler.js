const {  
     getAllEstadoProceso,
    getAllGeneroAgresor,
    getAllGeneroVictima,
    getAllSeveridadProcesos,
    getAllSeveridades
} = require('../controllers/InformacionAgresionController');

const getAllEstadoProcesoHandler = async (req, res) => {
    try {
       
        const EstadoProceso = await getAllEstadoProceso();

        return res.status(200).json({
            message: "EstadoProceso obtenidas correctamente",
            data: EstadoProceso,
        });
    } catch (error) {
        console.error("Error en EstadoProcesoHandler:", error.message);
        return res.status(500).json({
            message: "Error al obtener las EstadoProceso",
            error: error.message,
        });
    }
};
const getAllGeneroAgresorHandler = async (req, res) => {
    try {
     
        const unidades = await getAllGeneroAgresor();

        return res.status(200).json({
            message: "Unidades obtenidas correctamente",
            data: unidades,
        });
    } catch (error) {
        console.error("Error en getAllUnidadesHandler:", error.message);
        return res.status(500).json({
            message: "Error al obtener las unidades",
            error: error.message,
        });
    }
};
const getAllGeneroVictimaHandler = async (req, res) => {
    try {
     
        const unidades = await getAllGeneroVictima();

        return res.status(200).json({
            message: "Unidades obtenidas correctamente",
            data: unidades,
        });
    } catch (error) {
        console.error("Error en getAllUnidadesHandler:", error.message);
        return res.status(500).json({
            message: "Error al obtener las unidades",
            error: error.message,
        });
    }
};

const getAllSeveridadProcesosHandler = async (req, res) => {
    try {
     
        const unidades = await getAllSeveridadProcesos();

        return res.status(200).json({
            message: "Unidades obtenidas correctamente",
            data: unidades,
        });
    } catch (error) {
        console.error("Error en getAllUnidadesHandler:", error.message);
        return res.status(500).json({
            message: "Error al obtener las unidades",
            error: error.message,
        });
    }
};
const getAllSeveridadesHandler = async (req, res) => {
    try {
     
        const severidades = await getAllSeveridades();

        return res.status(200).json({
            message: "severidades obtenidas correctamente",
            data: severidades.data.map((severidades) =>
                ({
                    id: severidades.id,
                    descripcion: severidades.descripcion,
                    habilitado:severidades.habilitado
                    
                }))
        });
    } catch (error) {
        console.error("Error en getAllseveridadesHandler:", error.message);
        return res.status(500).json({
            message: "Error al obtener las severidades",
            error: error.message,
        });
    }
};

module.exports = { 
    getAllEstadoProcesoHandler,
    getAllGeneroAgresorHandler,
    getAllGeneroVictimaHandler,
    getAllSeveridadProcesosHandler,
    getAllSeveridadesHandler
 };

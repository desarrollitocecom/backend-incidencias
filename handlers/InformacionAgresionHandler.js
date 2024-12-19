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
            message: "Estados Proceso obtenidas correctamente",
            data: EstadoProceso.data.map(({ id, descripcion }) => ({
            id,
            descripcion
        }))
        
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
     
        const generos_agresor = await getAllGeneroAgresor();

        return res.status(200).json({
            message: "Estados Proceso obtenidas correctamente",
            data: generos_agresor.data.map(({ id, descripcion }) => ({
            id,
            descripcion     
        }))
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
     
        const genero_victima = await getAllGeneroVictima();

        return res.status(200).json({
            message: "Estados Proceso obtenidas correctamente",
            data: genero_victima.data.map(({ id, descripcion }) => ({
            id,
            descripcion     
        }))
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
     
        const severidad_procesos = await getAllSeveridadProcesos();

        return res.status(200).json({
            message: "Estados Proceso obtenidas correctamente",
            data: severidad_procesos.data.map(({ id, descripcion }) => ({
            id,
            descripcion     
        }))
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
            data: severidades.data.map(({ id, descripcion,habilitado }) => ({
            id,
            descripcion ,
            habilitado   
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

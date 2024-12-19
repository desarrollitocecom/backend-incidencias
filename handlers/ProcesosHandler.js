const {  
    getAllMedios,
    getAllSituaciones,
    getAllOperadores,
} = require('../controllers/PropiedadesController');

const getAllMediosHandler = async (req, res) => {
   try {
      
       const medios = await getAllMedios();

       
       return res.status(200).json({
           message: "Estados Proceso obtenidas correctamente",
           data: medios.data.map(({ id, codigo,descripcion }) => ({
           id,
           codigo,
           descripcion
       }))
       
   });

   } catch (error) {
       console.error("Error en mediosHandler:", error.message);
       return res.status(500).json({
           message: "Error al obtener los medios",
           error: error.message,
       });
   }
};
const getAllSituacionesHandler = async (req, res) => {
   try {
    
       const situaciones = await getAllSituaciones();

       return res.status(200).json({
           message: "Estados Proceso obtenidas correctamente",
           data: situaciones.data.map(({ id, descripcion }) => ({
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
const getAllOperadoresHandler = async (req, res) => {
   try {
    
       const Operadores = await getAllOperadores();

       return res.status(200).json({
           message: "Estados Proceso obtenidas correctamente",
           data: Operadores.data.map(({ id, medio_id,descripcion}) => ({
           id,
           medio_id,
           descripcion     
       }))
   });
   } catch (error) {
       console.error("Error en getAllOperadoresHandler:", error.message);
       return res.status(500).json({
           message: "Error al obtener las Operadores",
           error: error.message,
       });
   }
};

module.exports = { 
    getAllOperadoresHandler,
    getAllSituacionesHandler,
    getAllMediosHandler
};

const {
  getIncidenciasByDNI,
  getIncidenciaByID,
  postIncidencia,
} = require("../controllers/incidenciasController");

// Handler para obtener incidencias por DNI
const getIncidenciasByDNIHandler = async (req, res) => {
  const { dni } = req.params;
  let { fechaInicio, fechaFin } = req.query;

  if (fechaInicio)
    fechaInicio = new Date(fechaInicio).toISOString().split("T")[0]; // Formato YYYY-MM-DD

  if (fechaFin) fechaFin = new Date(fechaFin).toISOString().split("T")[0]; // Formato YYYY-MM-DD

  try {
    const incidencias = await getIncidenciasByDNI(dni, fechaInicio, fechaFin);

    if (!incidencias || incidencias.data.length === 0) {
      return res.status(200).json({
        message:
          "No se encontraron incidencias para el sereno con el DNI proporcionado",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: `Se encontraron ${incidencias.data.length} incidencias.`,
      data: incidencias.data.map((incidencia) => ({
        id: incidencia.id,
        codigo_incidencia: incidencia.codigo_incidencia,
        nombre_sereno: incidencia.sereno_nombre,
        sub_tipo_caso: incidencia.sub_tipo_caso_nombre,
        cargo_sereno: incidencia.cargo_sereno_nombre,
        jurisdiccion: incidencia.jurisdiccion_nombre,
        fecha: incidencia.fecha_ocurrencia,
        hora: incidencia.hora_ocurrencia,
      })),
    });
  } catch (error) {
    console.error("Error al obtener incidencias por DNI:", error);
    res.status(500).json({ error: error.message });
  }
};

// Handler para obtener una incidencia por su ID
const getIncidenciaByIDHandler = async (req, res) => {
  const { cod_incidencia } = req.params;

  try {
    const incidencia = await getIncidenciaByID(cod_incidencia);

    if (!incidencia) {
      return res.status(404).json({ message: "Incidencia no encontrada" });
    }

    res.status(200).json({
      success: incidencia.success,
      message: incidencia.message,
      data: incidencia.data,
    });
  } catch (error) {
    console.error("Error al obtener incidencia por ID:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const postIncidenciaHandler = async (req, res) => {
  try {
    const incidencia = req.body;
    if (!incidencia) {
      return res
        .status(400)
        .json({ message: "La información de la incidencia es requerida" });
    }
    const nuevaIncidencia = await postIncidencia(incidencia);
    if (!nuevaIncidencia) {
      return res.status(500).json({ message: "Error al crear la incidencia" });
    }

    return res.status(201).json(nuevaIncidencia);
  } catch (error) {
    console.error("Error al crear la incidencia:", error.message);
    res.status(500).json(error);
  }
};

module.exports = {
  getIncidenciasByDNIHandler,
  getIncidenciaByIDHandler,
  postIncidenciaHandler,
};

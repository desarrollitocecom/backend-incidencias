const fs = require("fs");

const {
  getAllPreIncidencias,
  getPreIncidenciaById,
  createPreIncidencia,
  updatePreIncidencia,
  deletePreIncidencia,
  getPhotoPreIncidencia,
  getPreIncidenciasBySereno,
  getHistorial
} = require("../controllers/preIncidenciaController");

const getAllPreIncidenciasHandler = async (req, res) => {
  const { page = 1, limit = 20, jurisdiccion_id } = req.query;

  const numPage = parseInt(page);
  const numLimit = parseInt(limit);
  try {
    const response = await getAllPreIncidencias(numPage, numLimit, jurisdiccion_id);
    res.status(200).json({ success: true, data: response.incidencias, totalCount: response.totalCount });
  } catch (error) {
    console.error("error en getAllPreIncidenciaHandler:", error.message);
    res.status(500).json(error);
  }
};

const getPreIncidenciaByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const incidencia = await getPreIncidenciaById(id);
    res.status(200).json({ success: true, data: incidencia });
  } catch (error) {
    res.status(404).json(error);
  }
};

const getPreIncidenciasBySerenoHandler = async (req, res) => {
  const { id } = req.params;
  let { fecha_inicio, fecha_fin, estado } = req.query;

  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  fecha_fin = fecha_fin || today.toISOString().split("T")[0];
  fecha_inicio = fecha_inicio || oneMonthAgo.toISOString().split("T")[0];

  try {
    const response = await getPreIncidenciasBySereno(id, {
      fecha_inicio,
      fecha_fin,
      estado,
    });
    res.status(200).json({ success: true, data: response.preincidencias, countState: response.countState });
  } catch (error) {
    res.status(404).json(error);
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
      const startIndex = archivo.path.indexOf("preincidencias");
      if (startIndex !== -1) {
        const relativePath = archivo.path
          .substring(startIndex)
          .replace(/\\/g, "/");
        incidencia.fotos.push(relativePath);
      } else {
        incidencia.fotos.push(archivo.path.replace(/\\/g, "/"));
      }
    }
    if (!incidencia) {
      return res
        .status(400)
        .json({ message: "La información de la incidencia es requerida" });
    }
    const nuevaIncidencia = await createPreIncidencia(incidencia);
    return res.status(201).json(nuevaIncidencia);
  } catch (error) {
    console.error("Error al crear la incidencia:", error.message);
    res.status(400).json(error);
  }
};

const updatePreIncidenciaHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const incidenciaData = req.body;
    const updatedIncidencia = await updatePreIncidencia(id, incidenciaData);
    res.status(200).json({ success: true, data: updatedIncidencia });
  } catch (error) {
    console.error("error en updatePreIncidenciaHandler:", error.message);
    res.status(400).json(error);
  }
};

const deletePreIncidenciaHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePreIncidencia(id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error("error en deletePreIncidenciaHandler:", error.message);
    res.status(400).json(error);
  }
};

const getPhotoPreIncidenciaHandler = async (req, res) => {
  const { name } = req.params;
  try {
    const filePath = await getPhotoPreIncidencia(name);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        statusCode: 404,
        message: "La foto no existe",
        error: "Not Found",
      });
    }

    res.sendFile(filePath);
  } catch (error) {
    console.error("Error en getPhotoPreIncidenciaHandler:", error.message);
    res.status(404).json({ error: "Foto no encontrada" });
  }
};

const getAllHistorialHandler = async (req, res) => {
  const { turno = 'Mañana', fecha } = req.query;
  try {
    const resp = await getHistorial(turno, fecha);
    res.status(200).json(resp);
    
  } catch (error) {
    console.error("Error en getPhotoPreIncidenciaHandler:", error.message);
    res.status(404).json({ error: "Foto no encontrada" });
  }
};

module.exports = {
  getAllPreIncidenciasHandler,
  getPreIncidenciaByIdHandler,
  createPreIncidenciaHandler,
  updatePreIncidenciaHandler,
  deletePreIncidenciaHandler,
  getPhotoPreIncidenciaHandler,
  getPreIncidenciasBySerenoHandler,
  getAllHistorialHandler
};

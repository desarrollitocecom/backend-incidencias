const {
  getUnidades,
  getTipoCaso,
  getSubTipoCaso,
  getTipoReportante,
} = require("../controllers/tipificacionController");

const getUnidadesHandler = async (req, res) => {
  try {
    const unidades = await getUnidades();
    res.status(200).json({
      message: "Unidades obtenidas correctamente",
      data: unidades.data.map((unidad) => ({
        id: unidad.id,
        descripcion: unidad.descripcion,
      })),
    });
  } catch (error) {
    console.error("Error al obtener unidades:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al obtener las unidades" });
  }
};

const getTipoCasoHandler = async (req, res) => {
  try {
    const tiposCaso = await getTipoCaso();

    const tiposCasoOrdenados = tiposCaso.sort((a, b) => {
      if (a.descripcion === null || a.descripcion === undefined) return 1;
      if (b.descripcion === null || b.descripcion === undefined) return -1;

      const prefixA = a.descripcion.substring(0, 4).toUpperCase();
      const prefixB = b.descripcion.substring(0, 4).toUpperCase();

      if (prefixA < prefixB) return -1;
      if (prefixA > prefixB) return 1;
      return 0;
    });

    res.status(200).json({
      message: "Tipos de caso obtenidos correctamente",
      data: tiposCasoOrdenados.map((tipoCaso) => ({
        id: tipoCaso.id,
        descripcion: tipoCaso.descripcion,
        unidad_id: tipoCaso.unidad_id,
        codigo: tipoCaso.codigo,
        subtipos: tipoCaso.subtipos,
      })),
    });
  } catch (error) {
    console.error("Error al obtener tipos de caso:", error);
    res.status(500).json({
      error: "Error interno del servidor al obtener los tipos de caso",
    });
  }
};



const getSubTipoCasoHandler = async (req, res) => {
  try {
    const subtiposCaso = await getSubTipoCaso();
    res.status(200).json({
      message: "Subtipos de caso obtenidos correctamente",
      data: subtiposCaso.data.map((subtipoCaso) => ({
        id: subtipoCaso.id,
        descripcion: subtipoCaso.descripcion,
        unidad_id: subtipoCaso.unidad_id,
        tipo_caso_id: subtipoCaso.tipo_caso_id,
      })),
    });
  } catch (error) {
    console.error("Error al obtener subtipos de caso:", error);
    res.status(500).json({
      error: "Error interno del servidor al obtener los subtipos de caso",
    });
  }
};

const getTipoReportanteHandler = async (req, res) => {
  try {
    const tiposReportante = await getTipoReportante();
    res.status(200).json({
      message: "Tipos de reportante obtenidos correctamente",
      data: tiposReportante,
    });
  } catch (error) {
    console.error("Error al obtener tipos de reportante:", error);
    res.status(500).json({
      error: "Error interno del servidor al obtener los tipos de reportante",
    });
  }
};

module.exports = {
  getUnidadesHandler,
  getTipoCasoHandler,
  getSubTipoCasoHandler,
  getTipoReportanteHandler,
};

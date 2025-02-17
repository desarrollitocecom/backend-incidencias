const path = require("path");
const { Incidencia } = require("../db_connection");
const { Op } = require("sequelize");

const getAllPreIncidencias = async (page = 1, limit = 20, jurisdiccion_id) => {
  const offset = page == 0 ? null : (page - 1) * limit;
  limit = page == 0 ? null : limit;

  try {
    const whereClause = {
      estado: "PENDIENTE",
      isDeleted: false,
    };

    if (jurisdiccion_id) {
      const ids = jurisdiccion_id.split(",").map((id) => id.trim());
      whereClause.jurisdiccion_id = { [Op.in]: ids };
    }

    const response = await Incidencia.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });
    return { incidencias: response.rows, totalCount: response.count };
  } catch (error) {
    console.log("Error: ", error);
    const errorResponse = {
      statusCode: 400,
      message: error.message || "Error al encontrar incidencias",
      error: "Bad Request",
    };
    throw errorResponse;
  }
};

const getPreIncidenciaById = async (id) => {
  try {
    const incidencia = await Incidencia.findByPk(id);
    if (!incidencia) {
      throw new Error("Incidencia no encontrada con el Id");
    }
    return incidencia;
  } catch (error) {
    console.log("Error: ", error);
    const errorResponse = {
      statusCode: 404,
      message: error.message || "Incidencia no encontrada",
      error: "Not Found",
    };
    throw errorResponse;
  }
};

const getPreIncidenciasBySereno = async (
  id,
  { fecha_inicio, fecha_fin, estado },
) => {
  try {
    const whereClause = {
      sereno_id: id,
      ...(fecha_inicio || fecha_fin
        ? {
          fecha_ocurrencia: {
            ...(fecha_inicio && { [Op.gte]: fecha_inicio }),
            ...(fecha_fin && { [Op.lte]: fecha_fin }),
          },
        }
        : {}),
      ...(estado ? { estado } : {}),
    };

    const preincidencias = await Incidencia.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "descripcion",
        "motivo",
        "fecha_ocurrencia",
        "hora_ocurrencia",
        "direccion",
        "codigo_incidencia",
        "estado",
      ],
    });

    if (!preincidencias) {
      throw new Error("Incidencia no encontrada con el Id");
    }
    return preincidencias;
  } catch (error) {
    console.log("Error: ", error);
    const errorResponse = {
      statusCode: 404,
      message: error.message || "Preincidencias no encontrada",
      error: "Not Found",
    };
    throw errorResponse;
  }
};

const createPreIncidencia = async (incidenciaData) => {
  delete incidenciaData.id;
  try {
    const nuevaIncidencia = await Incidencia.create(incidenciaData);
    return nuevaIncidencia;
  } catch (error) {
    console.log("Error: ", error);
    const errorResponse = {
      statusCode: 400,
      message: error.message || "Error al crear",
      error: "Bad Request",
    };
    throw errorResponse;
  }
};

const updatePreIncidencia = async (id, incidenciaData) => {
  delete incidenciaData.id;
  try {
    const incidencia = await Incidencia.findByPk(id);
    if (!incidencia) {
      throw new Error(`Incidencia con id ${id} no encontrado`);
    }

    await incidencia.update(incidenciaData);
    return await Incidencia.findByPk(id);
  } catch (error) {
    console.error(
      `Error al actualizar la incidencia con ID ${id}:`,
      error.message,
    );
    const errorResponse = {
      statusCode: 400,
      message: error.message || "Error al actualizar preincidencia",
      error: "Bad Request",
    };
    throw errorResponse;
  }
};

const deletePreIncidencia = async (id) => {
  try {
    const incidencia = await Incidencia.findByPk(id);
    if (!incidencia) {
      throw new Error("Incidencia no encontrada");
    }
    incidencia.estado = "RECHAZADO";
    incidencia.isDeleted = true;
    await incidencia.save();
    return { message: "Incidencia eliminada correctamente" };
  } catch (error) {
    console.error(
      `Error al eliminar la incidencia con ID ${id}:`,
      error.message,
    );

    const errorResponse = {
      statusCode: 404,
      message: error.message || "Incidencia no encontrada",
      error: "Not Found",
    };
    throw errorResponse;
  }
};

const getPhotoPreIncidencia = async (name) => {
  const foto_path = process.env.FOTOS_RUTA_PREINCIDENCIA;
  const filePath = path.join(foto_path, name);
  return filePath;
};

module.exports = {
  getAllPreIncidencias,
  getPreIncidenciaById,
  createPreIncidencia,
  updatePreIncidencia,
  deletePreIncidencia,
  getPhotoPreIncidencia,
  getPreIncidenciasBySereno,
};

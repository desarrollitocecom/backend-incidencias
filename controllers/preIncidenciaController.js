const path = require("path");
const axios = require("axios");

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
  const { INCIDENCIAS_URL } = process.env;

  try {
    const incidencia = await Incidencia.findByPk(id);
    if (!incidencia) {
      throw new Error("Incidencia no encontrada con el Id");
    }

    const { data: tipoCasoData, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_tipo_caso`,
    );

    const { data: subTipoCasoData } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_subtipo_caso`,
    );

    const tipoCasoDescripcion = tipoCasoData.data.find(
      (tipo) => tipo.id === incidencia.tipo_caso_id
    )?.descripcion || null;

    const subTipoCasoDescripcion = subTipoCasoData.data.find(
      (subTipo) => subTipo.id === incidencia.sub_tipo_caso_id
    )?.descripcion || null;

    return {
      id: incidencia.id,
      user_id: incidencia.user_id,
      tipo_caso_descripcion: tipoCasoDescripcion,
      sub_tipo_caso_descripcion: subTipoCasoDescripcion,
      descripcion: incidencia.descripcion,
      fecha_ocurrencia: incidencia.fecha_ocurrencia,
      hora_ocurrencia: incidencia.hora_ocurrencia,
      estado: incidencia.estado,
      codigo_incidencia: incidencia.codigo_incidencia,
      direccion: incidencia.direccion,
    };
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

const getPreIncidenciasBySereno = async (id, { fecha_inicio, fecha_fin, estado }) => {
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

    // Contamos la cantidad de incidencias por cada estado
    const countState = preincidencias.reduce((acc, inc) => {
      const state = inc.estado;
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});

    return { preincidencias, countState };
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

const getHistorial = async (turno, fecha) => {
  try {
    let targetDate = fecha ? fecha : new Date().toISOString().split('T')[0];
    console.log(`Filtrando por fecha: ${targetDate}`);

    const incidencias = await Incidencia.findAll({
      where: {
        fecha_ocurrencia: targetDate,
        estado: 'APROBADO',
        turno: turno
      },
      order: [['jurisdiccion_id', 'ASC']],
      // Asegúrate de que el modelo Incidencia tenga el atributo "turno"
      attributes: ['turno', 'jurisdiccion_id', 'sereno_id', 'nombre_reportante', 'codigo_incidencia']
    });

    /* 
      La estructura final tendrá la siguiente jerarquía:
      - Nivel 1: Agrupación por "turno"
      - Nivel 2: Dentro de cada turno, agrupación por "jurisdiccion_id"
      - Nivel 3: Dentro de cada jurisdicción, agrupación por "sereno_id" (con su "nombre_reportante" y un array de "codigo_incidencias")
    */
    const grouped = incidencias.reduce((acc, incidencia) => {
      const { turno, jurisdiccion_id, sereno_id, nombre_reportante, codigo_incidencia } = incidencia;

      // Nivel 1: Agrupar por turno
      let turnoGroup = acc.find(group => group.turno === turno);
      if (!turnoGroup) {
        turnoGroup = {
          turno,
          jurisdicciones: []
        };
        acc.push(turnoGroup);
      }

      // Nivel 2: Dentro del turno, agrupar por jurisdiccion_id
      let jurisdiccionGroup = turnoGroup.jurisdicciones.find(j => j.jurisdiccion_id === jurisdiccion_id);
      if (!jurisdiccionGroup) {
        jurisdiccionGroup = {
          jurisdiccion_id,
          users: []
        };
        turnoGroup.jurisdicciones.push(jurisdiccionGroup);
      }

      // Nivel 3: Dentro de la jurisdicción, agrupar por sereno_id
      let serenoGroup = jurisdiccionGroup.users.find(u => u.sereno_id === sereno_id);
      if (!serenoGroup) {
        serenoGroup = {
          sereno_id,
          nombre_reportante,
          codigo_incidencias: []
        };
        jurisdiccionGroup.users.push(serenoGroup);
      }

      // Agregar el código de incidencia
      serenoGroup.codigo_incidencias.push(codigo_incidencia);

      return acc;
    }, []);

    return grouped;
  } catch (error) {
    console.error(`Error al obtener el historial:`, error.message);
    const errorResponse = {
      statusCode: 400,
      message: error.message || "Error al obtener el historial",
      error: "Bad Request",
    };
    throw errorResponse;
  }
};



module.exports = {
  getAllPreIncidencias,
  getPreIncidenciaById,
  createPreIncidencia,
  updatePreIncidencia,
  deletePreIncidencia,
  getPhotoPreIncidencia,
  getPreIncidenciasBySereno,
  getHistorial
};

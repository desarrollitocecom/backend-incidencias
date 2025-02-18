const axios = require("axios");

const { INCIDENCIAS_URL } = process.env;

const getUnidades = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_unidades`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener las unidades");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTipoCaso = async () => {
  try {
    const { data: tipoCasoData, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_tipo_caso`,
    );

    const { data: subTipoCasoData } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_subtipo_caso`,
    );

    if (status !== 200) {
      throw new Error("Error al obtener los tipos de caso");
    }

    const tipoCasoConSubtipos = tipoCasoData.data.map(tipoCaso => {
      return {
        ...tipoCaso,
        subtipos: subTipoCasoData.data
          .filter(subtipo => subtipo.tipo_caso_id === tipoCaso.id.toString())
          .sort((a, b) => a.descripcion.substring(0, 6).localeCompare(b.descripcion.substring(0, 6)))
          .map((subtipo) => {
            return {
              id: subtipo.id,
              tipo_caso_id: subtipo.tipo_caso_id,
              descripcion: subtipo.descripcion,
              codigo: subtipo.codigo,
            }
          })
      };
    });

    return tipoCasoConSubtipos;
  } catch (error) {
    console.error(error);
  }
};

const getSubTipoCaso = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_subtipo_caso`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener los subtipos de caso");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTipoReportante = async () => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_tipo_reportante`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener los tipos de reportante");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUnidades,
  getTipoCaso,
  getSubTipoCaso,
  getTipoReportante,
};

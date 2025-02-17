const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs"); // Para manejar los archivos subidos
const { updatePreIncidencia } = require("./preIncidenciaController");

const { INCIDENCIAS_URL } = process.env;

const getIncidenciasByDNI = async (
  dni,
  fechaInicio = null,
  fechaFin = null,
) => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_incidencias_sereno/${dni}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener las incidencias");
    }
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const getIncidenciaByID = async (cod_incidencia) => {
  try {
    const { data, status } = await axios.get(
      `${INCIDENCIAS_URL}/api/ver_incidencia/${cod_incidencia}`,
    );
    if (status !== 200) {
      throw new Error("Error al obtener la incidencia");
    }
    return data;
  } catch (error) {
    console.error("Errores:", error);
    throw error;
  }
};

const postIncidencia = async (incidencia) => {
  const FOTOS_RUTA = process.env.FOTOS_RUTA_PREINCIDENCIA;

  const { id, ...incidenciaData } = incidencia;
  try {
    const formData = new FormData();

    delete incidencia.id;
    Object.keys(incidencia).forEach((key) => {
      if (key === "fotos" && Array.isArray(incidencia[key])) {
        incidencia[key].forEach((filePath, index) => {
          const fullPath = `${FOTOS_RUTA}/${filePath.split("/").pop()}`;
          formData.append(`file_save[]`, fs.createReadStream(fullPath));
        });
      } else {
        formData.append(key, incidencia[key]);
      }
    });

    // const { data, status } = await axios.post(
    //   `${INCIDENCIAS_URL}/api/crear_incidencia`,
    //   formData,
    //   {
    //     headers: {
    //       ...formData.getHeaders(),
    //     },
    //   },
    // );

    // if (data.success !== true) throw new Error("Error al crear la incidencia");

    // incidenciaData.estado = "APROBADO";
    // incidenciaData.convertidaAIncidencia = true;
    // incidenciaData.codigo_incidencia = data.codigo_incidencia;

    // const preincidencia = await updatePreIncidencia(id, incidenciaData);
    // return data;
    return 'ok';
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

module.exports = { getIncidenciasByDNI, getIncidenciaByID, postIncidencia };

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

    // const data = {
    //   success: true,
    //   data: {
    //     unidad_id: "1",
    //     tipo_caso_id: "2063",
    //     sub_tipo_caso_id: "2127",
    //     tipo_reportante_id: "2",
    //     direccion: "jr Ayacucho",
    //     latitud: "12.54",
    //     longitud: "23.87",
    //     descripcion: "Un echo grave en el distrito SJL, el dia Martes",
    //     fecha_ocurrencia: "2024-10-11",
    //     hora_ocurrencia: "15:34",
    //     severidad_id: "1",
    //     jurisdiccion_id: "1",
    //     medio_id: "1",
    //     situacion_id: "1",
    //     operador_id: "1",
    //     estado_proceso_id: "1",
    //     genero_agresor_id: "1",
    //     genero_victima_id: "2",
    //     severidad_proceso_id: "1",
    //     cargo_sereno_id: "1",
    //     sereno_id: "2",
    //     user_id: 1,
    //     codigo_incidencia: "R2025380633",
    //     updated_at: "2025-02-04T15:56:40.339000Z",
    //     created_at: "2025-02-04T15:56:40.339000Z",
    //     id: 944828,
    //   },
    //   codigo_incidencia: "R2025380633",
    //   message: "Incidencia registrada correctamente",
    // };
    const { data, status } = await axios.post(
      `${INCIDENCIAS_URL}/api/crear_incidencia`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );

    if (data.success !== true) throw new Error("Error al crear la incidencia");

    incidenciaData.estado = "APROBADO";
    incidenciaData.convertidaAIncidencia = true;
    incidenciaData.codigo_incidencia = data.codigo_incidencia;

    const preincidencia = await updatePreIncidencia(id, incidenciaData);
    // return data;
    return preincidencia;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

module.exports = { getIncidenciasByDNI, getIncidenciaByID, postIncidencia };

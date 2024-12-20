const { getAllSerenos, getSerenoByDNI, getCargoSereno, getJurisdicciones } = require('../controllers/serenosController');

const getAllSerenosHandler = async (req, res) => {
    try {
        const serenos = await getAllSerenos();
        res.status(200).json({
            message: 'Serenos obtenidos correctamente',
            data: serenos.data.map(({ id, dni, nombres, apellidoPaterno, apellidoMaterno, cargo_sereno_id }) => ({
                id,
                dni,
                nombres,
                apellidoPaterno,
                apellidoMaterno,
                cargo_sereno_id
            }))
        });
    } catch (error) {
        console.error('Error al obtener serenos:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los serenos' });
    }
};

const getSerenoByDNIHandler = async (req, res) => {
    const { dni } = req.params;

    try {
        const sereno = await getSerenoByDNI(dni);
        console.log("sereno: ", sereno);

        if (!sereno) {
            return res.status(200).json({ message: 'Sereno no encontrado', data: {} });
        }

        const { id, nombres, apellidoPaterno, apellidoMaterno, cargo_sereno_id } = sereno.data[0];

        res.status(200).json({
            message: 'Sereno obtenido correctamente',
            data: {
                id,
                dni,
                nombres,
                apellidoPaterno,
                apellidoMaterno,
                cargo_sereno_id
            }
        });
    } catch (error) {
        console.error('Error al obtener sereno por DNI:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener el sereno' });
    }
};


const getCargoSerenoHandler = async (req, res) => {
    try {
        const cargos = await getCargoSereno();
        res.status(200).json({
            message: 'Cargos de sereno obtenidos correctamente',
            data: cargos.data.map(({ id, descripcion }) => ({
                id,
                descripcion
            }))
        });
    } catch (error) {
        console.error('Error al obtener cargos de sereno:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los cargos de sereno' });
    }
};

const getJurisdiccionesHandler = async (req, res) => {
    try {
        const jurisdicciones = await getJurisdicciones();
        res.status(200).json({
            message: 'Jurisdicciones obtenidas correctamente',
            data: jurisdicciones.data.map(({ id, nombre }) => ({
                id,
                nombre
            }))
        });
    } catch (error) {
        console.error('Error al obtener jurisdicciones:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener las juriscicciones' });
    }
};

module.exports = {
    getAllSerenosHandler,
    getSerenoByDNIHandler,
    getCargoSerenoHandler,
    getJurisdiccionesHandler
};

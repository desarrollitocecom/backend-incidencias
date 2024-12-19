const { getAllSerenos, getSerenoByDNI, getCargoSereno } = require('../controllers/serenosController');

const getAllSerenosHandler = async (req, res) => {
    try {
        const serenos = await getAllSerenos();
        res.status(200).json({
            message: 'Serenos obtenidos correctamente',
            data: serenos
        });
    } catch (error) {
        console.error('Error al obtener serenos:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los serenos' });
    }
};

const getSerenoByDNIHandler = async (req, res) => {
    const { dni } = req.params;

    if (!dni) {
        return res.status(400).json({ message: 'El DNI es requerido' });
    }

    try {
        const sereno = await getSerenoByDNI(dni);
        if (!sereno) {
            return res.status(200).json({ message: 'Sereno no encontrado' });
        }
        res.status(200).json({
            message: 'Sereno encontrado',
            data: sereno
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
            data: cargos
        });
    } catch (error) {
        console.error('Error al obtener cargos de sereno:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los cargos de sereno' });
    }
};

module.exports = {
    getAllSerenosHandler,
    getSerenoByDNIHandler,
    getCargoSerenoHandler
};

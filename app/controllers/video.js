const mongoose = require('mongoose');
const model = require('../models/video');

// Función para manejar operaciones de base de datos
const handleDatabaseOperation = async (operation, res, successStatus = 200) => {
    try {
        const result = await operation;
        res.status(successStatus).send({ items: result });
    } catch (err) {
        console.error(err); // Registro de errores para depuración
        res.status(422).send({ error: 'Error' });
    }
};

// Función para convertir el ID a formato de MongoDB
const parseId = id => mongoose.Types.ObjectId(id);

// Controlador para obtener todos los datos
exports.getData = (req, res) => {
    handleDatabaseOperation(model.find({}).exec(), res);
};

// Controlador para obtener un solo dato
exports.getSingle = (req, res) => {
    handleDatabaseOperation(model.findOne({ _id: parseId(req.params.id) }).exec(), res);
};

// Controlador para actualizar un dato
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    handleDatabaseOperation(model.updateOne({ _id: parseId(id) }, body).exec(), res);
};

// Controlador para insertar un nuevo dato
exports.insertData = (req, res) => {
    handleDatabaseOperation(model.create(req.body), res, 201); // 201 para "Created"
};

// Controlador para eliminar un dato
exports.deleteSingle = (req, res) => {
    handleDatabaseOperation(model.deleteOne({ _id: parseId(req.params.id) }).exec(), res);
};

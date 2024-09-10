const mongoose = require('mongoose');
const model = require('../models/audio');

// Función para parsear ID
const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar las respuestas
const handleResponse = (res, successMessage) => (err, docs) => {
    if (err) {
        res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
    } else {
        res.send(successMessage ? { message: successMessage, items: docs } : { items: docs });
    }
};

// Función auxiliar para manejar operaciones de base de datos
const handleDatabaseOperation = (operation, req, res) => {
    operation((err, result) => {
        handleResponse(res, err, result);
    });
};

/**
 * Obtener todos los datos de audio
 */
exports.getData = (req, res) => {
    handleDatabaseOperation((callback) => model.find({}, callback), req, res);
};

/**
 * Obtener un solo audio por ID
 */
exports.getSingle = (req, res) => {
    const { id } = req.params;
    handleDatabaseOperation((callback) => model.findOne({ _id: parseId(id) }, callback), req, res);
};

/**
 * Actualizar datos del audio por ID
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    handleDatabaseOperation((callback) => model.updateOne({ _id: parseId(id) }, body, callback), req, res);
};

/**
 * Insertar datos del audio en la base de datos
 */
exports.insertData = (req, res) => {
    const data = req.body;
    handleDatabaseOperation((callback) => model.create(data, callback), req, res);
};

/**
 * Eliminar un audio por ID
 */
exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    handleDatabaseOperation((callback) => model.deleteOne({ _id: parseId(id) }, callback), req, res);
};
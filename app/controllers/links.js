const mongoose = require('mongoose');
const model = require('../models/links');

// Función para parsear el ID de MongoDB
const parseId = (id) => mongoose.Types.ObjectId(id);

// Función común para manejar las respuestas y errores
const sendResponse = (res, err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Error en la operación' });
    } else {
        res.send({ items: docs });
    }
};

// Función genérica para operaciones CRUD
const handleOperation = (operation, res, query = {}, data = null) => {
    if (operation === 'create') {
        model[operation](data, (err, docs) => sendResponse(res, err, docs));
    } else {
        model[operation](query, data, (err, docs) => sendResponse(res, err, docs));
    }
};

/**
 * Obtener múltiples registros de USUARIOS
 */
exports.getData = (req, res) => {
    handleOperation('find', res);
};

/**
 * Obtener un solo registro de USUARIOS
 */
exports.getSingle = (req, res) => {
    handleOperation('findOne', res, { _id: parseId(req.params.id) });
};

/**
 * Actualizar un solo registro de USUARIOS
 */
exports.updateSingle = (req, res) => {
    handleOperation('updateOne', res, { _id: parseId(req.params.id) }, req.body);
};

/**
 * Insertar un nuevo registro de USUARIOS
 */
exports.insertData = (req, res) => {
    handleOperation('create', res, {}, req.body);
};

/**
 * Eliminar un solo registro de USUARIOS
 */
exports.deleteSingle = (req, res) => {
    handleOperation('deleteOne', res, { _id: parseId(req.params.id) });
};

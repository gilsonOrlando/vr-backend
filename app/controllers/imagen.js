const mongoose = require('mongoose');
const model = require('../models/imagen');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función común para manejar las respuestas y errores
const sendResponse = (res, err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Error en la operación' });
    } else {
        res.send({ items: docs });
    }
};

// Función genérica para manejar operaciones de base de datos
const performDatabaseOperation = (operation, res, query = {}, data = null) => {
    model[operation](query, data, (err, docs) => {
        sendResponse(res, err, docs);
    });
};

/**
 * Obtener múltiples registros de USUARIOS
 */
exports.getData = (req, res) => {
    performDatabaseOperation('find', res);
};

/**
 * Obtener un solo registro de USUARIOS
 */
exports.getSingle = (req, res) => {
    performDatabaseOperation('findOne', res, { _id: parseId(req.params.id) });
};

/**
 * Actualizar un solo registro de USUARIOS
 */
exports.updateSingle = (req, res) => {
    performDatabaseOperation('updateOne', res, { _id: parseId(req.params.id) }, req.body);
};

/**
 * Insertar un nuevo registro de USUARIOS
 */
exports.insertData = (req, res) => {
    model.create(req.body, (err, docs) => {
        if (err) {
            res.status(422).send({ error: 'Error al crear el registro' });
        } else {
            res.send({ data: docs });
        }
    });
};

/**
 * Eliminar un solo registro de USUARIOS
 */
exports.deleteSingle = (req, res) => {
    performDatabaseOperation('deleteOne', res, { _id: parseId(req.params.id) });
};

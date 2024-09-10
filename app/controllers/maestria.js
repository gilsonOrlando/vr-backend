const mongoose = require('mongoose');
const model = require('../models/maestria');

// Función para parsear el ID de MongoDB
const parseId = (id) => mongoose.Types.ObjectId(id);

// Función genérica para manejar operaciones y respuestas
const handleRequest = (operation, req, res, data = {}) => {
    let query = data.query || {};
    let update = data.update || {};

    switch (operation) {
        case 'find':
            model.find(query, (err, docs) => sendResponse(res, err, docs));
            break;
        case 'findOne':
            model.findOne(query, (err, docs) => sendResponse(res, err, docs));
            break;
        case 'updateOne':
            model.updateOne(query, update, (err, docs) => sendResponse(res, err, docs));
            break;
        case 'create':
            model.create(data.body, (err, docs) => sendResponse(res, err, docs));
            break;
        case 'deleteOne':
            model.deleteOne(query, (err, docs) => sendResponse(res, err, docs));
            break;
        default:
            res.status(400).send({ error: 'Operación no soportada' });
    }
};

// Función común para manejar respuestas y errores
const sendResponse = (res, err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Error en la operación' });
    } else {
        res.send({ items: docs });
    }
};

/**
 * Obtener múltiples registros de USUARIOS
 */
exports.getData = (req, res) => {
    handleRequest('find', req, res);
};

/**
 * Obtener un solo registro de USUARIOS
 */
exports.getSingle = (req, res) => {
    handleRequest('findOne', req, res, { query: { _id: parseId(req.params.id) } });
};

/**
 * Actualizar un solo registro de USUARIOS
 */
exports.updateSingle = (req, res) => {
    handleRequest('updateOne', req, res, { query: { _id: parseId(req.params.id) }, update: req.body });
};

/**
 * Insertar un nuevo registro de USUARIOS
 */
exports.insertData = (req, res) => {
    handleRequest('create', req, res, { body: req.body });
};

/**
 * Eliminar un solo registro de USUARIOS
 */
exports.deleteSingle = (req, res) => {
    handleRequest('deleteOne', req, res, { query: { _id: parseId(req.params.id) } });
};

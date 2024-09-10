const mongoose = require('mongoose');
const model = require('../models/directivo');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función común para manejar respuestas
const sendResponse = (res, err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Error en la operación' });
    } else {
        res.send({ items: docs });
    }
};

// Función común para operaciones de base de datos
const handleDatabaseOperation = (operation, query, data, res) => {
    model[operation](query, data, (err, docs) => {
        sendResponse(res, err, docs);
    });
};

/**
 * Obtener múltiples registros de USUARIOS
 */
exports.getData = (req, res) => {
    handleDatabaseOperation('find', {}, null, res);
};

/**
 * Obtener un solo registro de USUARIOS
 */
exports.getSingle = (req, res) => {
    handleDatabaseOperation('findOne', { _id: parseId(req.params.id) }, null, res);
};

/**
 * Actualizar un solo registro de USUARIOS
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    handleDatabaseOperation('updateOne', { _id: parseId(id) }, body, res);
};

/**
 * Insertar un nuevo registro de USUARIOS
 */
exports.insertData = (req, res) => {
    const data = req.body;
    model.create(data, (err, docs) => {
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
    const { id } = req.params;
    handleDatabaseOperation('deleteOne', { _id: parseId(id) }, null, res);
};

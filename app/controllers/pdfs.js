const mongoose = require('mongoose');
const model = require('../models/pdfs');

// Función para parsear el ID de MongoDB
const parseId = (id) => mongoose.Types.ObjectId(id);

// Función genérica para manejar operaciones y respuestas
const handleOperation = (operation, query, res, update = null, body = null) => {
    const operations = {
        find: () => model.find(query, (err, docs) => handleResponse(res, err, docs)),
        findOne: () => model.findOne(query, (err, docs) => handleResponse(res, err, docs)),
        updateOne: () => model.updateOne(query, update, (err, docs) => handleResponse(res, err, docs)),
        create: () => model.create(body, (err, docs) => handleResponse(res, err, docs)),
        deleteOne: () => model.deleteOne(query, (err, docs) => handleResponse(res, err, docs))
    };

    if (operations[operation]) {
        operations[operation]();
    } else {
        res.status(400).send({ error: 'Operación no soportada' });
    }
};

// Función para manejar respuestas
const handleResponse = (res, err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Error en la operación' });
    } else {
        res.send({ items: docs });
    }
};

// Controladores específicos

exports.getData = (req, res) => {
    handleOperation('find', {}, res);
};

exports.getSingle = (req, res) => {
    handleOperation('findOne', { _id: parseId(req.params.id) }, res);
};

exports.updateSingle = (req, res) => {
    handleOperation('updateOne', { _id: parseId(req.params.id) }, res, req.body);
};

exports.insertData = (req, res) => {
    handleOperation('create', {}, res, null, req.body);
};

exports.deleteSingle = (req, res) => {
    handleOperation('deleteOne', { _id: parseId(req.params.id) }, res);
};

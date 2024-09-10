const mongoose = require('mongoose');
const model = require('../models/solicitud');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función para manejar operaciones CRUD con error y respuesta
const performOperation = (operation, query, res, body = null) => {
    model[operation](query, body, (err, docs) => {
        if (err) {
            res.status(err.status || 500).send({ error: 'Error en la operación' });
        } else {
            res.send({ items: docs });
        }
    });
};

// Controladores específicos

exports.getData = (req, res) => {
    performOperation('find', {}, res);
};

exports.getSingle = (req, res) => {
    performOperation('findOne', { _id: parseId(req.params.id) }, res);
};

exports.updateSingle = (req, res) => {
    performOperation('updateOne', { _id: parseId(req.params.id) }, res, req.body);
};

exports.insertData = (req, res) => {
    performOperation('create', null, res, req.body);
};

exports.deleteSingle = (req, res) => {
    performOperation('deleteOne', { _id: parseId(req.params.id) }, res);
};

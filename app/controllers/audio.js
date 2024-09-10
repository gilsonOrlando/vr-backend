const mongoose = require('mongoose');
const model = require('../models/audio');
const options = {
    page: 1,
    limit: 3
};

const parseId = (id) => {
    return mongoose.Types.ObjectId(id);
}

// Función común para manejar la respuesta
const sendResponse = (res, err, docs) => {
    if (err) {
        res.status(500).send({ error: 'Error en la operación' });
    } else {
        res.send({ items: docs });
    }
};

/**
 * Obtener DATA de USUARIOS
 */
exports.getData = (req, res) => {
    model.find({}, (err, docs) => {
        sendResponse(res, err, docs);
    });
};

/**
 * Obtener un solo registro de USUARIOS
 */
exports.getSingle = (req, res) => {
    model.findOne({ _id: parseId(req.params.id) }, (err, docs) => {
        sendResponse(res, err, docs);
    });
};

/**
 * Actualizar un solo registro de USUARIOS
 */
exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
        sendResponse(res, err, docs);
    });
};

/**
 * Insertar datos en la base de datos
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
    model.deleteOne({ _id: parseId(id) }, (err, docs) => {
        sendResponse(res, err, docs);
    });
};

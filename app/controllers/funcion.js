const mongoose = require('mongoose');
const model = require('../models/funcion');

// Función para manejar la respuesta y errores
const handleResponse = (res, promise, successStatus = 200) => {
    promise
        .then(docs => res.status(successStatus).send({ items: docs }))
        .catch(err => {
            console.error(err); // Para propósitos de depuración
            res.status(422).send({ error: 'Error' });
        });
};

// Función para obtener el ID de MongoDB
const parseId = id => mongoose.Types.ObjectId(id);

// Controlador para obtener todos los datos
exports.getData = (req, res) => {
    handleResponse(res, model.find({}).exec());
};

// Controlador para obtener un solo dato
exports.getSingle = (req, res) => {
    handleResponse(res, model.findOne({ _id: parseId(req.params.id) }).exec());
};

// Controlador para actualizar un dato
exports.updateSingle = (req, res) => {
    handleResponse(res, model.updateOne({ _id: parseId(req.params.id) }, req.body).exec());
};

// Controlador para insertar un dato
exports.insertData = (req, res) => {
    handleResponse(res, model.create(req.body), 201); // 201 para "Created"
};

// Controlador para eliminar un dato
exports.deleteSingle = (req, res) => {
    handleResponse(res, model.deleteOne({ _id: parseId(req.params.id) }).exec());
};

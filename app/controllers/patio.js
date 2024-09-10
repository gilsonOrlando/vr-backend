const mongoose = require('mongoose');
const model = require('../models/patio');

// Función para manejar operaciones de base de datos
const handleOperation = async (operation, res, successStatus = 200) => {
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

// Operaciones de base de datos encapsuladas en funciones
const findAll = () => model.find({});
const findById = id => model.findOne({ _id: parseId(id) });
const updateById = (id, body) => model.updateOne({ _id: parseId(id) }, body);
const deleteById = id => model.deleteOne({ _id: parseId(id) });
const create = data => model.create(data);

// Controladores CRUD
exports.getData = (req, res) => handleOperation(findAll(), res);

exports.getSingle = (req, res) => handleOperation(findById(req.params.id), res);

exports.updateSingle = (req, res) => {
    handleOperation(updateById(req.params.id, req.body), res);
};

exports.insertData = (req, res) => {
    handleOperation(create(req.body), res, 201);
};

exports.deleteSingle = (req, res) => handleOperation(deleteById(req.params.id), res);

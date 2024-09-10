const mongoose = require('mongoose');
const model = require('../models/words');

// Función para manejar las operaciones de base de datos y respuestas
const handleDatabaseOperation = async (operation, res, successStatus = 200) => {
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

// Función para obtener el controlador adecuado
const getController = (operation, successStatus = 200) => async (req, res) => {
    const { id } = req.params;
    const data = id ? { _id: parseId(id) } : {};
    handleDatabaseOperation(operation(data, req.body), res, successStatus);
};

// Controladores para las operaciones CRUD
exports.getData = getController(model.find.bind(model));

exports.getSingle = getController((data) => model.findOne(data));

exports.updateSingle = getController((data, body) => model.updateOne(data, body));

exports.insertData = getController((data) => model.create(data), 201);

exports.deleteSingle = getController((data) => model.deleteOne(data));

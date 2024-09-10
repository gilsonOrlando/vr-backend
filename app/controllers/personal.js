const mongoose = require('mongoose');
const model = require('../models/personal');

const parseId = (id) => mongoose.Types.ObjectId(id);

// Función auxiliar para manejar la respuesta
const handleResponse = (res, err, docs, status = 200) => {
    if (err) {
        res.status(status).send({ error: 'Error en la operación' });
    } else {
        res.status(status).send({ items: docs });
    }
};

// Función para ejecutar operaciones del modelo
const executeModelOperation = async (operation, query, body = null) => {
    try {
        let result;
        switch (operation) {
            case 'find':
                result = await model.find(query).exec();
                break;
            case 'findOne':
                result = await model.findOne(query).exec();
                break;
            case 'updateOne':
                result = await model.updateOne(query, body).exec();
                break;
            case 'create':
                result = await model.create(body);
                break;
            case 'deleteOne':
                result = await model.deleteOne(query).exec();
                break;
            default:
                throw new Error('Operación no soportada');
        }
        return result;
    } catch (err) {
        throw err;
    }
};

// Controlador genérico
const handleRequest = (operation, queryRequired, bodyExtractor) => async (req, res) => {
    try {
        const query = queryRequired ? { _id: parseId(req.params.id) } : {};
        const body = bodyExtractor ? bodyExtractor(req) : null;
        const result = await executeModelOperation(operation, query, body);
        const status = operation === 'create' ? 201 : 200;
        handleResponse(res, null, result, status);
    } catch (err) {
        handleResponse(res, err);
    }
};

// Controladores específicos
exports.getData = handleRequest('find', false, null);
exports.getSingle = handleRequest('findOne', true, null);
exports.updateSingle = handleRequest('updateOne', true, req => req.body);
exports.insertData = handleRequest('create', false, req => req.body);
exports.deleteSingle = handleRequest('deleteOne', true, null);

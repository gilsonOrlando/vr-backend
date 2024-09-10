const mongoose = require('mongoose');
const model = require('../models/docente');

// Función para manejar operaciones de base de datos
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

// Función auxiliar para encontrar documentos
const findDocuments = async (query) => model.find(query);
const findOneDocument = async (query) => model.findOne(query);
const updateDocument = async (query, update) => model.updateOne(query, update);
const deleteDocument = async (query) => model.deleteOne(query);
const createDocument = async (data) => model.create(data);

// Controladores CRUD utilizando funciones auxiliares
exports.getData = (req, res) => {
    handleDatabaseOperation(findDocuments({}), res);
};

exports.getSingle = (req, res) => {
    handleDatabaseOperation(findOneDocument({ _id: parseId(req.params.id) }), res);
};

exports.updateSingle = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    handleDatabaseOperation(updateDocument({ _id: parseId(id) }, body), res);
};

exports.insertData = (req, res) => {
    const data = req.body;
    handleDatabaseOperation(createDocument(data), res, 201);
};

exports.deleteSingle = (req, res) => {
    const { id } = req.params;
    handleDatabaseOperation(deleteDocument({ _id: parseId(id) }), res);
};

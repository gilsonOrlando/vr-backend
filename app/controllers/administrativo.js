const mongoose = require('mongoose');
const model = require('../models/administrativo');

/**
 * Función auxiliar para parsear el ID del usuario
 * @param {string} id - ID del usuario en formato de string
 * @returns {Object} - ID del usuario en formato ObjectId de Mongoose
 */
const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

/**
 * Función para manejar la respuesta al cliente
 * @param {Object} res - Objeto de respuesta Express
 * @param {Object} data - Datos a enviar en la respuesta
 * @param {number} [statusCode=200] - Código de estado HTTP (predeterminado: 200 - OK)
 */
const handleResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).send(data);
};

/**
 * Función para manejar errores y enviar respuestas de error
 * @param {Object} res - Objeto de respuesta Express
 * @param {Error} err - Error que ocurrió
 */
const handleError = (res, err) => {
  console.error(err); // Log del error en la consola para depuración
  handleResponse(res, { error: 'Ocurrió un error al procesar la solicitud.' }, 500);
};

/**
 * Obtener todos los datos de usuarios
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
exports.getData = (req, res) => {
  model.find({}, (err, docs) => {
    if (err) return handleError(res, err);
    handleResponse(res, { items: docs });
  });
};

/**
 * Obtener datos de un usuario específico
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
exports.getSingle = (req, res) => {
  model.findOne({ _id: parseId(req.params.id) }, (err, docs) => {
    if (err) return handleError(res, err);
    handleResponse(res, { items: docs });
  });
};

/**
 * Actualizar datos de un usuario específico
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
exports.updateSingle = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  model.updateOne({ _id: parseId(id) }, body, (err, docs) => {
    if (err) return handleError(res, err);
    handleResponse(res, { items: docs });
  });
};

/**
 * Insertar nuevos datos de usuario
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
exports.insertData = (req, res) => {
  const data = req.body;
  model.create(data, (err, docs) => {
    if (err) {
      console.error(err); // Log del error en la consola para depuración
      handleResponse(res, { error: 'Error al insertar datos.' }, 422);
    } else {
      handleResponse(res, { data: docs });
    }
  });
};

/**
 * Eliminar datos de un usuario específico
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
exports.deleteSingle = (req, res) => {
  const { id } = req.params;
  model.deleteOne({ _id: parseId(id) }, (err, docs) => {
    if (err) return handleError(res, err);
    handleResponse(res, { items: docs });
  });
};
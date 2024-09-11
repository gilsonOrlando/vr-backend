const fs = require("fs");
const path = require("path");

// Función para eliminar archivos por su nombre (asíncrona)
const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.join(__basedir, "uploads", fileName); // Usar path para mayor seguridad y consistencia

  fs.unlink(directoryPath, (err) => {
    if (err) {
      return res.status(500).send({
        message: "Could not delete the file. Error: " + err.message // Usar err.message para un error más claro
      });
    }

    res.status(200).send({
      message: "File is deleted."
    });
  });
};

// Función para eliminar archivos de manera sincrónica (bloquea el evento loop)
const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.join(__basedir, "uploads", fileName); // Usar path para la ruta

  try {
    fs.unlinkSync(directoryPath);
    res.status(200).send({
      message: "File is deleted."
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. Error: " + err.message // Usar err.message
    });
  }
};

module.exports = {
  remove,
  removeSync,
};

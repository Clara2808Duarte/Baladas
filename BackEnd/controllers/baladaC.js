//Controller para gerenciar as baladas
const Balada = require("../models/baladaM");

// ============================
// Controlador: GET todas baladas
// ============================
exports.getAll = (req, res) => {
  Balada.getAllBaladas((err, baladas) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(baladas); 
    }
  });
};

// ============================
// Controlador: GET balada por ID
// ============================
exports.getById = (req, res) => {
  Balada.getBaladaById(req.params.id, (err, balada) => {
    if (err) {
      res.status(500).send(err);
    } else if (balada) {
      res.json(balada);
    } else {
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};

// ============================
// Controlador: GET baladas por cidade
// ============================
exports.getByCidade = (req, res) => {
  const { cidade } = req.params;
  Balada.getBaladasByCidade(cidade, (err, baladas) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(baladas);
    }
  });
};

// ============================
// Controlador: GET baladas por data
// ============================
exports.getByData = (req, res) => {
  const { data } = req.params;
  Balada.getBaladasByData(data, (err, baladas) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(baladas);
    }
  });
};

// ============================
// Controlador: POST nova balada
// ============================
exports.create = (req, res) => {
  Balada.createBalada(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(result); // { id: novoId }
    }
  });
};

// ============================
// Controlador: PUT atualizar balada
// ============================
exports.update = (req, res) => {
  Balada.updateBalada(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.changes > 0) {
      res.status(200).json({ message: "Balada atualizada com sucesso" });
    } else {
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};

// ============================
// Controlador: DELETE balada
// ============================
exports.delete = (req, res) => {
  Balada.deleteBalada(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.changes > 0) {
      res.status(200).json({ message: "Balada deletada com sucesso" });
    } else {
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};
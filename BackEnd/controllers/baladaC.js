// Controller para gerenciar as baladas
// Importa o model que contém as funções para manipular o banco de dados
const Balada = require("../models/baladaM");

// ============================
// Controlador: GET todas as baladas
// ============================
exports.getAll = (req, res) => {
  // Chama a função do model para buscar todas as baladas
  Balada.getAllBaladas((err, baladas) => {
    if (err) {
      // Se ocorrer erro no banco, retorna status 500 (erro interno)
      res.status(500).send(err);
    } else {
      // Se não houver erro, retorna o resultado em formato JSON
      res.json(baladas);
    }
  });
};

// ============================
// Controlador: GET balada por ID
// ============================
exports.getById = (req, res) => {
  // Pega o id do parâmetro da rota e busca no banco
  Balada.getBaladaById(req.params.id, (err, balada) => {
    if (err) {
      // Erro interno do servidor
      res.status(500).send(err);
    } else if (balada) { 
      // Se a balada foi encontrada, retorna em JSON
      res.json(balada);
    } else {
      // Se não encontrou, retorna status 404 (não encontrado)
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};

// ============================
// Controlador: GET baladas por cidade
// ============================
exports.getByCidade = (req, res) => {
  const { cidade } = req.params; // pega cidade da rota
  Balada.getBaladasByCidade(cidade, (err, baladas) => {
    if (err) {
      res.status(500).send(err); // erro interno
    } else {
      res.json(baladas); // retorna baladas encontradas
    }
  });
};

// ============================
// Controlador: GET baladas por data
// ============================
exports.getByData = (req, res) => {
  const { data } = req.params; // pega data da rota
  Balada.getBaladasByData(data, (err, baladas) => {
    if (err) {
      res.status(500).send(err); // erro interno
    } else {
      res.json(baladas); // retorna baladas encontradas
    }
  });
};

// ============================
// Controlador: GET baladas por tipo
// ============================
exports.getByTipo = (req, res) => {
  const { tipo } = req.params; // pega tipo da rota
  Balada.getBaladasByTipo(tipo, (err, baladas) => {
    if (err) {
      res.status(500).send(err); // erro interno
    } else {
      res.json(baladas); // retorna baladas encontradas
    }
  });
};

// ============================
// Controlador: POST nova balada
// ============================
exports.create = (req, res) => {
  // Recebe os dados da balada via corpo da requisição (req.body)
  Balada.createBalada(req.body, (err, result) => { // result contém { id: novoId }
    if (err) { 
      res.status(500).send(err); // erro interno
    } else {
      res.status(201).json(result); // sucesso, retorna novo id
    }
  });
};

// ============================
// Controlador: PUT atualizar balada
// ============================
exports.update = (req, res) => {
  // Recebe id via parâmetro e dados via corpo da requisição
  Balada.updateBalada(req.params.id, req.body, (err, result) => { 
    if (err) {
      res.status(500).send(err); // erro interno
    } else if (result.changes > 0) { 
      // Se alguma linha foi atualizada, retorna sucesso
      res.status(200).json({ message: "Balada atualizada com sucesso" });
    } else {
      // Se nenhuma linha foi alterada, retorna 404 (não encontrada)
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};

// ============================
// Controlador: DELETE balada
// ============================
exports.delete = (req, res) => {
  // Recebe id via parâmetro
  Balada.deleteBalada(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err); // erro interno
    } else if (result.changes > 0) { 
      // Se alguma linha foi deletada, retorna sucesso
      res.status(200).json({ message: "Balada deletada com sucesso" });
    } else {
      // Se nenhuma linha foi deletada, retorna 404 (não encontrada)
      res.status(404).send({ message: "Balada não encontrada" });
    }
  });
};

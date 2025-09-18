// Importa a biblioteca SQLite3 e ativa o modo verbose para logs mais detalhados
const sqlite3 = require("sqlite3").verbose();

// Caminho do arquivo do banco de dados SQLite
const dbPath = "./infra/balada.db";

// ============================
// Função para abrir conexão com o banco de dados
// ============================
function openDbConnection() {
  // Abre o banco em modo leitura e escrita
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Erro ao abrir o banco de dados:", err.message);
    }
  });
  return db; // Retorna a conexão para ser usada nas funções abaixo
}

// ============================
// CRUD BALADAS
// ============================

// Buscar todas as baladas
function getAllBaladas(callback) {
  const db = openDbConnection(); // Abre conexão
  db.all("SELECT * FROM Balada", [], (err, rows) => {
    // Executa a query SELECT
    db.close(); // Fecha a conexão
    callback(err, rows); // Retorna erro e dados pelo callback
  });
}

// Buscar baladas por cidade
function getBaladasByCidade(cidade, callback) {
  const db = openDbConnection();
  db.all(
    // Consulta que ignora maiúsculas/minúsculas
    "SELECT * FROM Balada WHERE LOWER(cidade) = LOWER(?)",
    [cidade], // Substitui o ? pelo valor de cidade
    (err, rows) => {
      db.close();
      callback(err, rows);
    }
  );
}

// Buscar baladas por data
function getBaladasByData(data, callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM Balada WHERE data_evento = ?", [data], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}

// Buscar baladas por tipo
function getBaladasByTipo(tipo, callback) {
  const db = openDbConnection();
  db.all(
    // Ignora maiúsculas/minúsculas no tipo
    "SELECT * FROM Balada WHERE LOWER(tipo) = LOWER(?)",
    [tipo],
    (err, rows) => {
      db.close();
      callback(err, rows);
    }
  );
}

// Buscar balada específica por ID
function getBaladaById(id, callback) {
  const db = openDbConnection();
  db.get("SELECT * FROM Balada WHERE id = ?", [id], (err, row) => {
    db.close();
    callback(err, row);
  });
}

// Criar nova balada
function createBalada(balada, callback) {
  // Desestrutura o objeto balada recebido
  const { cidade, endereco, data_evento, tipo } = balada;
  const db = openDbConnection();
  db.run(
    `INSERT INTO Balada (cidade, endereco, data_evento, tipo) 
     VALUES (?, ?, ?, ?)`,
    [cidade, endereco, data_evento, tipo], // Valores que entram no INSERT
    function (err) {
      db.close();
      // this.lastID pega o ID da nova linha inserida
      callback(err, { id: this.lastID });
    }
  );
}

// Atualizar balada existente
function updateBalada(id, balada, callback) {
  const { cidade, endereco, data_evento, tipo } = balada; // Campos a atualizar
  const db = openDbConnection();
  db.run(
    `UPDATE Balada
     SET cidade = ?, endereco = ?, data_evento = ?, tipo = ? 
     WHERE id = ?`,
    [cidade, endereco, data_evento, tipo, id], // Valores substituindo os ?
    function (err) {
      db.close();
      // this.changes indica quantas linhas foram afetadas pela atualização
      callback(err, { changes: this.changes });
    }
  );
}

// Deletar balada pelo ID
function deleteBalada(id, callback) {
  const db = openDbConnection();
  db.run("DELETE FROM Balada WHERE id = ?", [id], function (err) {
    db.close();
    // this.changes indica quantas linhas foram excluídas
    callback(err, { changes: this.changes });
  });
}

// ============================
// Exportando as funções para serem usadas no controller/rotas
// ============================
module.exports = {
  getAllBaladas,      // Buscar todas
  getBaladasByCidade, // Buscar por cidade
  getBaladasByData,   // Buscar por data
  getBaladasByTipo,   // Buscar por tipo
  getBaladaById,      // Buscar uma balada pelo ID
  createBalada,       // Criar nova balada
  updateBalada,       // Atualizar balada existente
  deleteBalada,       // Deletar balada
};

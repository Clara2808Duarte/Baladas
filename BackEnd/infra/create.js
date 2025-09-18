// Importa o pacote “sqlite3” e ativa o modo verbose (modo detalhado de log).
// O modo verbose ajuda a mostrar mensagens de erro mais claras e detalhadas.
const sqlite3 = require('sqlite3').verbose(); 

// Cria uma conexão com o banco de dados SQLite.
const db = new sqlite3.Database(
  './balada.db',  // './balada.db' é o caminho do arquivo do banco. 
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, //   Se não existir, ele será criado
  //Abrir para leitura/escrita e criar caso não exista

  (err) => { // Callback chamado depois de tentar abrir o banco
    // Se acontecer algum erro ao abrir o banco, imprime no console
    if (err) { 
      return console.error('Erro ao abrir o banco de dados:', err.message); 
    }
    // Se não houver erro, mostra mensagem de sucesso
    console.log('Conectado ao banco de dados SQLite.'); 
  }
);

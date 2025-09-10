// app.js
const express = require("express");
const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições em JSON
app.use(express.json());

// Importando apenas as rotas de baladas
const baladaRoutes = require("./routes/baladaR");

// Usando as rotas de baladas
app.use("/baladas", baladaRoutes);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`🎉 Servidor rodando em http://localhost:${port}/baladas`);
});
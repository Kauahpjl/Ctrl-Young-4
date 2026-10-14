// Importa o middleware responsável por validar o título
const validateTitle = require("../middlewares/validateTitle");

// Importa o Express, framework utilizado para criar o servidor
const express = require("express");

// Cria um roteador para organizar as rotas da aplicação
const router = express.Router();

// Importa o controller responsável pelas operações com livros
const bookController = require("../controllers/bookController");

// Cria uma rota POST para cadastrar novos livros
router.post(
  "/books",

  // Verifica se o título enviado é válido
  validateTitle,

  // Executa a função responsável por criar e salvar o livro
  bookController.createBook
);

// Exporta o roteador para ser utilizado em outros arquivos
module.exports = router;

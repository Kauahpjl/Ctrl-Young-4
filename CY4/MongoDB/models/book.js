// Importa o Mongoose, biblioteca utilizada para
// criar modelos e interagir com o MongoDB
const mongoose = require('mongoose');

// Cria um Schema que define a estrutura e as
// regras de validação dos livros no banco de dados
const bookSchema = new mongoose.Schema({

  // Define o título como texto obrigatório
  // e exige no mínimo 3 caracteres
  title: {
    type: String,
    required: [true, "O título é obrigatório"],
    minlength: [3, "O título deve ter pelo menos 3 caracteres"]
  },

  // Define o autor como texto obrigatório
  // e exige no mínimo 3 caracteres
  author: {
    type: String,
    required: [true, "O autor é obrigatório"],
    minlength: [3, "O nome do autor deve ter pelo menos 3 caracteres"]
  },

  // Define o ano de publicação como número obrigatório
  // Aceita anos entre 1000 e o ano atual
  year: {
    type: Number,
    required: [true, "O ano de publicação é obrigatório"],
    min: [1000, "Ano inválido"],
    max: [new Date().getFullYear(), "O ano não pode ser no futuro"]
  },

  // Define o gênero do livro como texto obrigatório
  genre: {
    type: String,
    required: [true, "O gênero é obrigatório"]
  },

  // Armazena a data de criação do livro
  // Date.now define automaticamente a data atual
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Cria o modelo Book utilizando o Schema definido
// O Mongoose utiliza esse modelo para manipular
// os documentos da coleção de livros no MongoDB
const Book = mongoose.model('Book', bookSchema);

// Exporta o modelo para ser utilizado em outros arquivos
module.exports = Book;

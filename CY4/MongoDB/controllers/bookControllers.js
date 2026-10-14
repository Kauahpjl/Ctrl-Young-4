// Importa o modelo Book, responsável pelos livros no banco de dados
const Book = require("../models/book");

// Cria uma função assíncrona para cadastrar um novo livro
const createBook = async (req, res) => {
  try {
    // Extrai os dados enviados pelo usuário no corpo da requisição
    const { title, author, year, genre } = req.body;

    // Cria um novo livro utilizando o modelo Book
    const newBook = new Book({ title, author, year, genre });

    // Salva o novo livro no banco de dados
    await newBook.save();

    // Retorna o livro criado com o código HTTP 201 (Criado)
    res.status(201).json(newBook);

  } catch (err) {
    // Retorna o erro HTTP 500 caso ocorra uma falha
    res.status(500).json({ error: "Erro ao criar livro" });
  }
};

// Exporta a função para ser utilizada em outros arquivos
module.exports = { createBook };

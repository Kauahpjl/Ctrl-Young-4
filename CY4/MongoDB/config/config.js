// Importa o Mongoose, biblioteca utilizada para
// conectar e interagir com o MongoDB
const mongoose = require('mongoose');

// Cria uma função assíncrona para conectar ao banco de dados
const connectDB = async () => {
  try {
    // Tenta estabelecer conexão com o MongoDB local
    // utilizando o banco de dados 'minhaLivrariaDB'
    await mongoose.connect('mongodb://localhost:27017/minhaLivrariaDB');

    // Exibe uma mensagem caso a conexão seja bem-sucedida
    console.log('MongoDB conectado!');

  } catch (err) {
    // Captura e exibe possíveis erros durante a conexão
    console.error('Erro ao conectar ao MongoDB:', err);

    // Encerra a aplicação com código 1, indicando um erro
    process.exit(1);
  }
};

// Exporta a função para ser utilizada em outros arquivos
module.exports = connectDB;

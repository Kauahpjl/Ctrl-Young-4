// Importa o Mongoose, biblioteca utilizada para
// criar modelos e interagir com o MongoDB
const mongoose = require('mongoose');

// Cria um Schema que define a estrutura
// dos usuários no banco de dados
const userSchema = new mongoose.Schema({

  // Define o nome do usuário como texto
  name: {
    type: String
  },

  // Define o e-mail do usuário como texto
  email: {
    type: String
  },

  // Define o telefone do usuário como texto
  phone: {
    type: String
  },

  // Armazena a data de criação do usuário
  // Date.now define automaticamente a data atual
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Cria o modelo User utilizando o Schema definido
// O Mongoose utiliza esse modelo para manipular
// os documentos da coleção de usuários no MongoDB
const User = mongoose.model('User', userSchema);

// Exporta o modelo para ser utilizado em outros arquivos
module.exports = User;

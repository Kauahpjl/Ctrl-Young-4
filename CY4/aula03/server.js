js
// Importa o Express para dentro do projeto.
//
// O Express é um framework para Node.js que facilita
// a criação de servidores e APIs.
const express = require('express');


// Executa o Express e cria uma aplicação.
//
// "app" será usado para configurar o servidor,
// criar rotas, receber requisições e enviar respostas.
const app = express();


// Middleware que permite que o Express interprete
// dados enviados no formato JSON.
//
// Isso é importante quando, por exemplo,
// um cliente envia um objeto JSON para a API.
app.use(express.json());


// Inicia o servidor na porta 3000.
//
// A partir desse momento, o servidor começa a aceitar
// requisições nessa porta.
app.listen(3000, () =>

    // Executado quando o servidor começa a funcionar.
    console.log('Servidor rodando na porta 3000')
);


// Cria um array com os filmes.
//
// "let" é usado porque o array poderá ser alterado,
// por exemplo, adicionando ou removendo filmes.
let movies = [

    {
        id: 1,
        title: "O Senhor dos Anéis",
        genre: "Fantasia",
        year: 2001
    },

    {
        id: 2,
        title: "Matrix",
        genre: "Ficção Científica",
        year: 1999
    }

];


// Adiciona um novo filme no FINAL do array.
movies.push({
    id: 3,
    title: "Cidade de Deus",
    genre: "Favela",
    year: 2000
});


// Mostra todos os filmes no terminal.
console.log(movies);


// Percorre todos os filmes do array.
//
// "movie" representa cada filme durante a repetição.
movies.forEach(movie => {

    // Mostra informações de cada filme.
    //
    // ${} permite colocar valores de variáveis
    // dentro de uma string usando template literals.
    console.log(
        `Titulo: ${movie.title}, Genero: ${movie.genre}, Ano: ${movie.year}`
    );
});


// Procura o filme que possui id igual a 1.
//
// .find() retorna o objeto encontrado.
// Caso não encontre, retorna undefined.
let movieToUpdate = movies.find(movie => movie.id === 1);


// Verifica se encontrou o filme.
if (movieToUpdate) {

    // Altera o gênero do filme encontrado.
    movieToUpdate.genre = "Aventura";

    // Mostra o resultado da alteração.
    console.log(
        `Filme atualizado: ${movieToUpdate.title}, Gênero: ${movieToUpdate.genre}`
    );
}


// Procura a POSIÇÃO do filme com id igual a 2.
//
// .findIndex() retorna o índice do elemento.
// Se não encontrar, retorna -1.
let index = movies.findIndex(movie => movie.id === 2);


// Verifica se encontrou o filme.
if (index !== -1) {

    // Remove 1 elemento começando na posição encontrada.
    //
    // Exemplo:
    // Se index for 1:
    // splice(1, 1)
    // → começa no índice 1
    // → remove 1 elemento
    movies.splice(index, 1);

    console.log("Filme removido!");
}


// Cria uma rota GET.
//
// Quando alguém acessar:
// http://localhost:3000/read
//
// essa função será executada.
app.get('/read', (req, res) => {

    // Envia uma resposta com status HTTP 200 (OK).
    //
    // .json() transforma o array "movies" em JSON
    // e envia esse JSON para quem fez a requisição.
    res.status(200).json(movies);
});


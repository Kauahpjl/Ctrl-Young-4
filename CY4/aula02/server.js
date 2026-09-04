js
// Cria uma variável chamada "movies" que guarda um ARRAY.
// O array começa com 2 objetos, e cada objeto representa um filme.
//
// Usamos "let" porque o conteúdo do array poderá ser alterado depois.
let movies = [

    // Primeiro filme
    {
        id: 1,
        title: "O Senhor dos Anéis",
        genre: "Fantasia",
        year: 2001
    },

    // Segundo filme
    {
        id: 2,
        title: "Matrix",
        genre: "Ficção Científica",
        year: 1999
    }

];


// .push() adiciona um novo elemento no FINAL do array.
//
// Aqui estamos adicionando um terceiro filme.
movies.push({
    id: 3,
    title: "Cidade de Deus",
    genre: "Favela",
    year: 2000
});


// Mostra o array inteiro no terminal.
console.log(movies);


// .forEach() percorre TODOS os elementos do array.
//
// Para cada filme, a função será executada uma vez.
// "movie" representa o filme que está sendo processado naquele momento.
movies.forEach(movie => {

    // Mostra algumas informações de cada filme.
    //
    // ${movie.title} pega o título do filme.
    // ${movie.genre} pega o gênero.
    // ${movie.year} pega o ano.
    //
    // As crases ` ` permitem usar ${} dentro do texto.
    console.log(
        `Titulo: ${movie.title}, Genero: ${movie.genre}, Ano: ${movie.year}`
    );

});


// .find() procura dentro do array um elemento que atenda à condição.
//
// Aqui estamos procurando o filme cujo ID seja igual a 1.
//
// Se encontrar, "movieToUpdate" receberá o objeto encontrado.
// Se não encontrar, receberá "undefined".
let movieToUpdate = movies.find(movie => movie.id === 1);


// Verifica se o filme foi encontrado.
//
// Se movieToUpdate existir, o código dentro do if será executado.
if (movieToUpdate) {

    // Altera o gênero do filme encontrado.
    //
    // O filme com ID 1 era "Fantasia".
    // Agora passa a ser "Aventura".
    movieToUpdate.genre = "Aventura";

    // Mostra no terminal o filme depois da alteração.
    console.log(
        `Filme atualizado: ${movieToUpdate.title}, Gênero: ${movieToUpdate.genre}`
    );
}


// .findIndex() procura a POSIÇÃO (índice) de um elemento no array.
//
// Aqui estamos procurando a posição do filme com ID 2.
//
// Exemplo:
// índice 0 → Senhor dos Anéis
// índice 1 → Matrix
// índice 2 → Cidade de Deus
let index = movies.findIndex(movie => movie.id === 2);


// Se o .findIndex() não encontrar o elemento,
// ele retorna -1.
//
// Portanto, verificamos se o resultado é diferente de -1.
if (index !== -1) {

    // .splice() remove elementos do array.
    //
    // Primeiro parâmetro: posição onde começaremos a remover.
    // Segundo parâmetro: quantidade de elementos que serão removidos.
    //
    // Exemplo:
    // splice(1, 1)
    // → começa no índice 1
    // → remove 1 elemento
    //
    // Nesse caso, remove o filme "Matrix".
    movies.splice(index, 1);

    // Informa no terminal que o filme foi removido.
    console.log("Filme removido!");
}


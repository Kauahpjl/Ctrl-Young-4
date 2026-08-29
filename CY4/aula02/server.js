let movies = [
    { id: 1, title: "O Senhor dos Anéis", genre: "Fantasia", year: 2001 },
    { id: 2, title: "Matrix", genre: "Ficção Científica", year: 1999 }
];

movies.push({ 
    id: 3, title: "Cidade de Deus",
    genre: "Favela", 
    year: 2000

});
console.log(movies)

movies.forEach(movie => {
    console.log(`Titulo: ${movie.title}, Genero: ${movie.genre}, Ano: ${movie.year}`)
})

let movieToUpdate = movies.find(movie => movie.id === 1);
if (movieToUpdate) {
    movieToUpdate.genre = "Aventura";
    console.log(`Filme atualizado: ${movieToUpdate.title}, Gênero: ${movieToUpdate.genre}`);
}

let index = movies.findIndex(movie => movie.id === 2);
if (index !== -1) {
    movies.splice(index, 1);
    console.log("Filme removido!");
}
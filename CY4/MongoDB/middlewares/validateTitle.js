
// Cria uma função chamada validateTitle.
//
// Essa função recebe três coisas:
//
// req  → requisição que chegou
// res  → resposta que vamos enviar
// next → função que permite passar para o próximo middleware/rota
const validateTitle = (req, res, next) => {


  // Pega algumas propriedades que vieram dentro do corpo
  // da requisição.
  //
  // Exemplo de req.body:
  //
  // {
  //   "title": "Batman",
  //   "author": "DC",
  //   "year": 2026,
  //   "genre": "Herói"
  // }
  //
  // Depois dessa desestruturação:
  //
  // title  → "Batman"
  // author → "DC"
  // year   → 2026
  // genre  → "Herói"
  //
  // IMPORTANTE:
  // Neste middleware, somente "title" está sendo utilizado.
  const { title, author, year, genre } = req.body;


  // Verifica se o título é válido.
  //
  // Temos TRÊS condições:
  //
  // 1. !title
  //    Verifica se o título não existe ou possui um valor falsy.
  //
  //    Exemplos:
  //    undefined
  //    null
  //    ""
  //
  // 2. typeof title !== "string"
  //    Verifica se o título NÃO é uma string.
  //
  //    Exemplo:
  //
  //    title: 123
  //
  //    typeof 123 → "number"
  //
  //    Portanto, seria inválido.
  //
  // 3. title.length < 3
  //    Verifica se o título possui menos de 3 caracteres.
  //
  //    "Oi" → 2 caracteres → inválido
  //    "Sol" → 3 caracteres → válido
  //
  // O operador || significa "OU".
  //
  // Então basta UMA dessas condições ser verdadeira
  // para o título ser considerado inválido.
  if (
    !title ||
    typeof title !== "string" ||
    title.length < 3
  ) {


    // return faz duas coisas:
    //
    // 1. Envia a resposta para o cliente.
    // 2. Interrompe imediatamente a execução da função.
    //
    // Isso é importante porque não queremos que a requisição
    // continue para a criação do livro.
    return res


      // 400 = Bad Request.
      //
      // Significa que o cliente enviou uma requisição inválida.
      .status(400)


      // Envia uma resposta em formato JSON.
      .json({
        error:
          "O título é obrigatório e deve ter pelo menos 3 caracteres.",
      });
  }


  // Se chegou até aqui, significa que o título passou
  // por todas as validações.
  //
  // next() manda a requisição para o próximo middleware
  // ou para a função da rota.
  //
  // SEM ESSA LINHA, a requisição fica parada aqui.
  next();
};


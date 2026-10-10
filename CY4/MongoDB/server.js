
// Importa o Express para dentro do arquivo.
// O Express é um framework para Node.js que facilita a criação
// de servidores e APIs HTTP.
const express = require("express");


// Importa a função responsável por conectar a aplicação
// ao banco de dados.
// Esse arquivo provavelmente contém uma função que usa o Mongoose
// para conectar ao MongoDB.
const connectDB = require("./config/config");


// Importa o modelo Book.
// Esse modelo representa a estrutura dos livros no banco de dados.
// Provavelmente foi criado usando mongoose.Schema().
const Book = require("./models/book");


// Cria uma aplicação Express.
// "app" será o objeto principal que vamos usar para configurar
// as rotas, middlewares e o servidor.
const app = express();


// Executa a função de conexão com o banco de dados.
// A partir daqui, a aplicação tenta estabelecer conexão
// com o MongoDB.
const bookRoutes = require('./routes/bookRoutes');
connectDB();
app.use(express.json());
app.use('/api', bookRoutes);


// Middleware responsável por transformar JSON recebido nas requisições
// em um objeto JavaScript acessível através de req.body.
//
// Exemplo:
// Se o cliente enviar:
//
// {
//   "title": "Batman",
//   "author": "DC",
//   "year": 2026
// }
//
// Podemos acessar esses dados usando:
// req.body.title
// req.body.author
// req.body.year
app.use(express.json());


// Importa um middleware personalizado chamado validateTitle.
// Esse middleware provavelmente verifica se o título do livro
// foi enviado corretamente antes de permitir a criação do livro.
const validateTitle = require("./middlewares/validateTitle");


// ============================================================
// POST /api/books
// ============================================================
//
// Essa rota é responsável por CRIAR um novo livro.
//
// POST normalmente é utilizado quando queremos criar um novo recurso.
//
// O caminho:
// /api/books
//
// O "validateTitle" é executado antes da função principal.
//
// Fluxo:
//
// requisição
//    ↓
// validateTitle
//    ↓
// criação do livro
//    ↓
// banco de dados
//    ↓
// resposta
app.post("/api/books", validateTitle, async (req, res) => {

  // try/catch é utilizado para lidar com possíveis erros.
  //
  // Como estamos trabalhando com operações assíncronas,
  // erros podem acontecer durante a comunicação com o banco.
  try {

    // Desestrutura o objeto req.body.
    //
    // Em vez de escrever:
    //
    // req.body.title
    // req.body.author
    // req.body.year
    // req.body.genre
    //
    // podemos pegar todas essas propriedades de uma vez.
    const { title, author, year, genre } = req.body;


    // Cria uma nova instância do modelo Book.
    //
    // Aqui o livro ainda NÃO foi necessariamente salvo no banco.
    // Estamos apenas criando o objeto seguindo o modelo Book.
    //
    // Os valores recebidos do cliente são colocados nas propriedades
    // correspondentes.
    const newBook = new Book({
      title,
      author,
      year,
      genre
    });


    // Salva o novo livro no banco de dados.
    //
    // "await" faz o JavaScript esperar a operação terminar
    // antes de continuar.
    //
    // save() retorna uma Promise.
    await newBook.save();


    // Envia uma resposta para o cliente.
    //
    // status(201):
    // 201 = Created
    // Indica que um recurso foi criado com sucesso.
    //
    // json(newBook):
    // transforma o objeto do livro em JSON e envia para o cliente.
    res.status(201).json(newBook);


  } catch (err) {

    // Se alguma coisa der errado durante a criação do livro,
    // chegamos aqui.
    //
    // 500 = Internal Server Error
    //
    // Significa que aconteceu um erro no servidor.
    res.status(500).json({
      error: "Erro ao criar livro."
    });
  }
});


// ============================================================
// GET /api/books/:id
// ============================================================
//
// Essa rota busca UM livro específico pelo ID.
//
// ":id" é um parâmetro dinâmico.
//
// Exemplo:
//
// /api/books/64abc123
//
// Nesse caso:
// req.params.id
//
// será:
// "64abc123"
app.get("/api/books/:id", async (req, res, next) => {

  try {

    // Pega o parâmetro "id" da URL.
    //
    // req.params contém os parâmetros definidos na rota.
    const { id } = req.params;


    // Procura no banco de dados um livro que possua esse ID.
    //
    // findById() é um método do Mongoose.
    //
    // Como a consulta ao banco é assíncrona,
    // utilizamos await.
    const book = await Book.findById(id);


    // Verifica se nenhum livro foi encontrado.
    //
    // !book significa:
    // "book NÃO existe".
    if (!book) {

      // return interrompe a execução da função.
      //
      // Sem o return, o código poderia continuar executando
      // e tentar enviar outra resposta.
      return res.status(404).json({
        error: "Livro não encontrado"
      });
    }


    // Se o livro foi encontrado,
    // envia o livro como JSON.
    //
    // Quando não especificamos status(),
    // o Express utiliza 200 OK por padrão.
    res.json(book);


  } catch (err) {

    // Em vez de tratar o erro diretamente aqui,
    // passamos o erro para o próximo middleware.
    //
    // O Express entende que next(err) significa:
    // "aconteceu um erro, mande para o middleware de erro".
    next(err);
  }
});


// ============================================================
// PATCH /api/books/:id
// ============================================================
//
// Essa rota atualiza parcialmente um livro.
//
// PATCH é utilizado quando queremos alterar apenas algumas
// propriedades de um recurso.
//
// Exemplo:
//
// {
//   "year": 2026
// }
//
// Nesse caso, somente o ano pode ser alterado.
app.patch("/api/books/:id", async (req, res) => {

  try {

    // Pega o ID enviado na URL.
    const { id } = req.params;


    // Pega todos os dados enviados pelo cliente.
    //
    // Por exemplo:
    //
    // {
    //   "title": "Novo título",
    //   "year": 2026
    // }
    //
    // updates terá exatamente esses dados.
    const updates = req.body;


    // Configurações para a operação de atualização.
    const options = {
      // new: true
      //
      // Faz o Mongoose retornar o documento DEPOIS da atualização.
      //
      // Sem isso, dependendo da operação, poderíamos receber
      // a versão antiga do documento.
      new: true,

      // runValidators: true
      //
      // Faz o Mongoose executar as validações do modelo
      // durante a atualização.
      //
      // Isso é importante para impedir dados inválidos.
      runValidators: true
    };


    // Procura o livro pelo ID e atualiza os dados.
    //
    // findByIdAndUpdate():
    // 1. procura pelo ID
    // 2. aplica as alterações
    // 3. retorna o documento atualizado por causa do new: true
    const updatedBook =
      await Book.findByIdAndUpdate(id, updates, options);


    // Verifica se o livro não existe.
    if (!updatedBook)

      // 404 = Not Found
      //
      // O ID foi recebido, mas nenhum livro correspondente
      // foi encontrado.
      return res.status(404).json({
        error: "Livro não encontrado"
      });


    // Envia o livro atualizado para o cliente.
    res.json(updatedBook);


  } catch (err) {

    // Se ocorrer algum erro durante a atualização,
    // retorna erro 500.
    res.status(500).json({
      error: "Erro ao atualizar livro."
    });
  }
});


// ============================================================
// DELETE /api/books/:id
// ============================================================
//
// Essa rota exclui um livro pelo ID.
//
// DELETE é utilizado para remover recursos.
app.delete("/api/books/:id", async (req, res) => {

  try {

    // Pega o ID da URL.
    const { id } = req.params;


    // Procura o livro pelo ID e remove ele do banco.
    //
    // deletedBook vai receber o documento que foi excluído.
    //
    // Se nenhum livro existir com aquele ID,
    // o resultado será null.
    const deletedBook =
      await Book.findByIdAndDelete(id);


    // Verifica se nenhum livro foi encontrado.
    if (!deletedBook)

      // Retorna 404 caso o livro não exista.
      return res.status(404).json({
        error: "Livro não encontrado"
      });


    // Se a exclusão deu certo,
    // envia uma mensagem de confirmação.
    res.json({
      message: "Livro excluído com sucesso"
    });


  } catch (err) {

    // Caso aconteça algum erro durante a exclusão,
    // retorna status 500.
    res.status(500).json({
      error: "Erro ao excluir livro"
    });
  }
});


// ============================================================
// MIDDLEWARE GLOBAL DE TRATAMENTO DE ERROS
// ============================================================
//
// Esse middleware captura erros que foram enviados usando:
//
// next(err)
//
// Ele possui QUATRO parâmetros:
//
// err  -> erro
// req  -> requisição
// res  -> resposta
// next -> próximo middleware
//
// O Express reconhece automaticamente esse formato
// como um middleware de tratamento de erros.
app.use((err, req, res, next) => {

  // Mostra no terminal os detalhes do erro.
  //
  // err.stack normalmente contém:
  // - mensagem do erro
  // - arquivo onde ocorreu
  // - linha
  // - caminho que levou ao erro
  console.error(err.stack);


  // Envia uma mensagem genérica para o cliente.
  //
  // Não mostramos err.stack para o usuário porque isso poderia
  // revelar informações internas da aplicação.
  res.status(500).json({
    error: "Ocorreu um erro no servidor."
  });
});


// ============================================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================================
//
// Faz o Express começar a "escutar" requisições HTTP
// na porta 3000.
//
// Depois disso, podemos acessar a API através de algo como:
//
// http://localhost:3000
app.listen(3000, () =>
  console.log("Server running on port 3000")
);


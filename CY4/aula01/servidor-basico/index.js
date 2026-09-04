js
// Exibe uma mensagem no terminal quando o arquivo é executado.
console.log("Olá, alunos do curso de Node.js!");

// Importa o módulo HTTP nativo do Node.js.
// O "require" serve para importar módulos.
const http = require('http');

// Cria um servidor HTTP.
// Toda vez que alguém fizer uma requisição,
// essa função será executada.
//
// req = request (requisição do cliente)
// res = response (resposta que o servidor vai enviar)
const server = http.createServer((req, res) => {

    // Verifica se a URL acessada é a página inicial "/".
    if (req.url === '/') {

        // Código 200 significa que a requisição deu certo.
        res.statusCode = 200;

        // Define o tipo de conteúdo que será enviado.
        // "text/plain" significa texto simples.
        res.setHeader('Content-Type', 'text/plain');

        // Envia a mensagem e encerra a resposta.
        res.end('Bem-vindo à nossa rede social!');

    // Verifica se a URL acessada é "/amigos".
    } else if (req.url === '/amigos') {

        // Código 200 = requisição realizada com sucesso.
        res.statusCode = 200;

        // Define que a resposta será um texto simples.
        res.setHeader('Content-Type', 'text/plain');

        // Envia a resposta para o navegador.
        res.end('Aqui está a lista de seus amigos!');

    // Se nenhuma das URLs anteriores for encontrada...
    } else {

        // Código 404 significa que a página/recurso não foi encontrado.
        res.statusCode = 404;

        // Define que a resposta será um texto simples.
        res.setHeader('Content-Type', 'text/plain');

        // Envia a mensagem de erro e encerra a resposta.
        res.end('Erro 404: Página não encontrada.');
    }
});

// Faz o servidor começar a "escutar" a porta 3000.
// Isso significa que podemos acessar o servidor através dela.
//
// O callback () => {...} é executado quando o servidor começa
// a funcionar corretamente.
server.listen(3000, () => {

    // Mostra no terminal que o servidor está funcionando.
    console.log('Servidor rodando na porta 3000');
});


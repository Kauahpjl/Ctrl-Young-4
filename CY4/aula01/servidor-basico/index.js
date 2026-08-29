console.log("Olá, alunos do curso de Node.js!");

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Bem-vindo à nossa rede social!');
    } else if (req.url === '/amigos') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Aqui está a lista de seus amigos!');
    } else {
    res.statusCode = 404; // Código de status para erro
    res.setHeader('Content-Type', 'text/plain'); // Formato da resposta
    res.end('Erro 404: Página não encontrada.');
}
});
server.listen(3000, () => { console.log('Servidor rodando na porta 3000');});
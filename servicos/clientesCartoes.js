var restify = require('restify');

var cliente = restify.createJsonClient({
    url: 'http://localhost:3001'
});

cliente.post('/cartoes/autoriza', cartao, function(erro, req, res, result) {
    console.log('consumindo serviços de cartões');
    console.log('result');
});
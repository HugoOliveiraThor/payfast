/**
 * Created by hugooliveira on 02/10/16.
 */
module.exports = function(app) {
    app.get('/pagamentos', function(req, res) {
        console.log('Requisicao na porta 3000')
        res.send('ok');
    });
    app.post('/pagamentos/pagamento', function(req, res) {
        req.assert('forma_de_pagamento', 'Forma de pagamento é obrigatório').notEmpty();
        req.assert('valor', 'Valor é obrigatório e deve ser um decimal').notEmpty().isFloat();

        var erros = req.validationErrors();

        if (erros) {
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }


        var pagamento = req.body;
        console.log('Processamento a requisicao de um novo pagamento');
        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.persistence.connectionFactory();
        var pagamentoDao = new app.persistence.PagamentoDao(connection);


        pagamentoDao.salva(pagamento, function(error, resultado) {
            console.log('Pagamento criado');
            if (error) {
                console.log('INSERT | Pagamentos | Error' + error);
                res.status(400).send(error);
            } else {
                res.location('/pagamentos/pagamento/' + resultado.insertId);
                res.status(201).json(pagamento)
            }

        });
    });
}
/**
 * Created by hugooliveira on 02/10/16.
 */
module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {
        console.log('Requisicao na porta 3000')
        res.send('ok');
    });


    app.post('/pagamentos/pagamento', function (req, res) {

        req.assert('pagamento.forma_de_pagamento', 'Forma de pagamento é obrigatório').notEmpty();
        req.assert('pagamento.valor', 'Valor é obrigatório e deve ser um decimal').notEmpty().isFloat();

        var erros = req.validationErrors();

        if (erros) {
            console.log('Erros de validação encontrados');
            res.status(400).send(erros);
            return;
        }
        var pagamento = req.body['pagamento'];


        console.log('Processamento a requisicao de um novo pagamento');
        pagamento.status = 'CRIADO';
        pagamento.data = new Date;



        var connection = app.persistence.connectionFactory();
        var pagamentoDao = new app.persistence.PagamentoDao(connection);

        pagamentoDao.salva(pagamento, function (error, resultado) {
            console.log('Pagamento criado');
            if (error) {
                console.log('INSERT | Pagamentos | Error' + error);
                res.status(400).send(error);
            } else {
                pagamento.id = resultado.insertId;

                if (pagamento.forma_de_pagamento == 'cartao') {
                    var cartao = req.body['cartao'];


                    var clientesCartoes = new app.servicos.clienteCartoes();
                    clientesCartoes.autoriza(cartao, function (exception, request, response, retorno) {
                        console.log('Retorno cartão', retorno);
                        res.status(201).json(retorno);
                        return;

                    });



                }else{
                    res.location('/pagamentos/pagamento/' + pagamento.id);

                    var response = {
                        dados_do_pagamento: pagamento,
                        links: [{
                            href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
                            rel: 'confirmar',
                            method: 'PUT'
                        },
                            {
                                href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
                                rel: 'cancelar',
                                method: 'DELETE'
                            },
                        ]
                    }
                    res.status(201).json(response);
                    //STATUS CODE = 201 = Created ;
                }


            }

        });
    });

    app.put('/pagamentos/pagamento/:id', function (req, res) {
        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.persistence.connectionFactory();
        var pagamentoDao = new app.persistence.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function (error) {
            if (error) {
                res.status(500).send(error);
                return
            }
            console.log('Pagamento confirmado');
            res.send(pagamento);
        })

    });

    app.delete('/pagamentos/pagamento/:id', function (req, res) {
        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CANCELADO';
        console.log('Pagamento', pagamento);

        var connection = app.persistence.connectionFactory();
        var pagamentoDao = new app.persistence.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function (error) {
            if (error) {
                res.status(500).send(500);
                return;
            }
            console.log('Pagamento cancelado');
            res.status(204).send(pagamento);
            //STATUS CODE = 204 - Requisicao feita com sucesso , porém não tem nada para retornar . 
        })

    })


}
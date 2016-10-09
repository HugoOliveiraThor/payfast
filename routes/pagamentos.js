/**
 * Created by hugooliveira on 02/10/16.
 */
module.exports = function(app) {
    app.get('/pagamentos', function(req, res) {
        console.log('Requisicao na porta 3000')
        res.send('ok');
    });
    app.post('/pagamentos/pagamento', function(req, res) {
        var pagamento = req.body;
        console.log('Processamento a requisicao de um novo pagamento');
        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.persistence.connectionFactory();
        var pagamentoDao = new app.persistence.PagamentoDao(connection);


        pagamentoDao.salva(pagamento, function(error, resultado) {
            console.log('Pagamento criado');
            res.json(pagamento);
        });
    });
}
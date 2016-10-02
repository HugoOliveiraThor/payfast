/**
 * Created by hugooliveira on 10/2/16.
 */
module.exports = function(app) {
    app.get('/pagamentos', function(req, res) {
        console.log('Requisicao na porta 3000')
        res.send('ok');
    });
    app.post('/pagamentos/pagamento', function(req, res) {
        var pagamento = req.body;
        console.log(pagamento);
        res.send('OK');
    });
}
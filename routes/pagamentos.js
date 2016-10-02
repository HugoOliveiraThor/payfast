/**
 * Created by hugooliveira on 10/2/16.
 */
module.exports = function(){
    app.get('/pagamentos',function(req,res) {
        console.log('Requisicao na porta 3000')
        res.send('ok');
    });
}

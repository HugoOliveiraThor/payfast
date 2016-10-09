function PagamentoDao(connection) {
    this._connection = connection;
}

PagamentoDao.prototype.salva = function(pagamento, callback) {
    this._connection.query('INSERT INTO pagamento SET ? ', pagamento, callback);
}

PagamentoDao.prototype.lista = function(callback) {
    this._connection.query('SELECT * from pagamentos', callback);
}

PagamentoDao.prototype.buscaPorId = function(id, callback) {
    this._connection.query('SELECT * pagamentos where id = ?', [id], callback);
}
module.exports = function(){
    return PagamentoDao;
}
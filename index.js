var app = require('./config/custom-express')();
var consign = require('consign');

app.listen(3000,function(){
    console.log('Servidor Rodando');
})


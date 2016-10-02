/**
 * Created by hugooliveira on 10/2/16.
 */
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');


module.exports = function() {
    var app = express();

    app.use(bodyParser.json());


    consign()
        .include('routes')
        .then('persistence')
        .into(app);

    return app;
}
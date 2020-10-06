require('marko/node-require').install();
require('marko/express');

//importação e custom do Express
const express = require('express');
const app = express();
//req do bodyParser para Middlewares
const bodyParser = require('body-parser');
//config 
app.use(bodyParser.urlencoded({
    extended: true
}));

//importação da ROTAS e exportação para o APP
const rotas = require('../app/rotas/rotas');
rotas(app);


//exportação APP -- export dafult MODULE.exports
module.exports = app;
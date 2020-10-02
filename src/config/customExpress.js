require('marko/node-require').install();
require('marko/express');

//importação e custom do Express
const express = require('express');
const app = express();

//importação da ROTAS e exportação para o APP
const rotas = require('../app/rotas/rotas');
rotas(app);


//exportação APP -- export dafult MODULE.exports
module.exports = app;
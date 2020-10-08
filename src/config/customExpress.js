require('marko/node-require').install();
require('marko/express');

//importação e custom do Express
const express = require('express');
const app = express();
//req do bodyParser para Middlewares
const bodyParser = require('body-parser');
// import
const methodOverride = require('method-override');

//config Middlewares para pag estatico
app.use('/estatico', express.static('src/app/public'));

//config 
app.use(bodyParser.urlencoded({
    extended: true
}));
//config Middle para rota POST E PUT no Form de edit
app.use(methodOverride(function (req, res) {
    if (req.body &&  typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//importação da ROTAS e exportação para o APP
const rotas = require('../app/rotas/rotas');
rotas(app);


//exportação APP -- export dafult MODULE.exports
module.exports = app;
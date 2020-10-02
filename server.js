/* import = REQUIRE --! import http from 'require' 
const express = require('express');
const app = express();
---------------------------------------------------
Import da confing custom do EXPRESS de outra pasta */
const app = require('./src/config/customExpress');

app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});
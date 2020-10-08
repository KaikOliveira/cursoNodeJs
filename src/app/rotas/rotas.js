//import do DAO
const LivroDao = require('../infra/livroDao');

//import do banco de dados
const db = require('../../config/database');


module.exports = (app) => {
    //criando de rota GET --- CallBeck
    app.get('/', function(req, resp) {
        //resposta ao servidor -- Send=Enviar
        resp.send(`
            <html>
                 <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do codigo </h1>
                </body>
            </html>
        `);
    });
    //buscando dados do BD e exportando para tamblete HTML MARKO 
    app.get('/livros', function(req, resp) {
       
     //instacia do livroDAO da conx com DB   
     const livroDao = new LivroDao(db);
     //usando Promise
     livroDao.lista()
        .then(livros => resp.marko (
            require('../views/livros/lista/lista.marko'),
            {
                livros: livros
            }
        ))
        .catch(erro =>
           console.log(erro) );

    });

    //Rota para Cadastro/FORM
    app.get('/livros/form', function(req, resp){
        resp.marko(
            require('../views/livros/form/form.marko'), {livro: {}} );
    });

     //ROTA para Edição
     app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        //instacia de LivroDAO da conx com DB
        const livroDao = new LivroDao(db);
        //Promise
        livroDao.buscaPorId(id)
            .then(livro =>
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro}
                )
            )
            .catch(erro => console.log(erro));
    });

    //Rota para Adicionar 
    app.post('/livros', function(req, resp){
        console.log(req.body);
        //instacia do livroDAO da conx com DB 
        const livroDao = new LivroDao(db);
        //usando Promise 
        livroDao.adiciona(req.body)
           .then(resp.redirect('/livros'))
           .catch(erro =>
              console.log(erro) 
           );
    });
    //Editar ??
    app.put('/livros', function(req, resp){
        console.log(req.body);
        //instacia do livroDAO da conx com DB 
        const livroDao = new LivroDao(db);
        //usando Promise 
        livroDao.atualiza(req.body)
           .then(resp.redirect('/livros'))
           .catch(erro =>
              console.log(erro) 
           );
    });
    //ROTA para delete 
    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
        //instacia de livroDAO da conx com DB
        const livroDao = new LivroDao(db);
        //Promise
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    });
     
};





/*
const http = require('http');

//const recebendo o parametro do import + function Anoy cm requisiçao/resposta 
const servidor = http.createServer( function(req, resp){
    resp.end(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>

            <body>
                <h1> Casa do codigo </h1>
            </body>
        </html>
    `);
});

        resp.marko(
            require('../views/livros/lista/lista.marko'),{
                livros: [
                        {
                        id:1,
                        titulo:'Fundamendos do Node'
                    },
                    {
                        id:2,
                        titulo: 'Node Avançado'
                    }
                ]
            }
        );

        resp.marko(
                require('../views/livros/lista/lista.marko'),{
                    livros: resultados
                }
            )
servidor.listen(3000);
*/
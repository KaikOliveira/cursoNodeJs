//class responsavel por fazer a conex com o BD / From Livros-Lista 
class LivroDao {

    constructor(db) {
        this._db = db;
    }
    //Promisse ADICIONAR LIVRO
    adiciona(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?,?,?)
            `,[
                livro.titulo,
                livro.preco,
                livro.descricao
              ],
              function (err) {
                  if (err) {
                      console.log(err);
                      return reject ('Não foi possivel adicionar o livro');
                  }
                  resolve();
              }
            )
        });
    }
    //Promisse LISTAR LIVRO
    lista(){
        return new Promise ((resolve, reject) => {
            this._db.all(
                "SELECT * FROM livros",
                (erro, resultados) => {
                    if (erro)
                    return reject('Não foi possivel listar os livros!');

                    return resolve(resultados);
                }
                    
            )
        });
        
    }
}

module.exports = LivroDao;
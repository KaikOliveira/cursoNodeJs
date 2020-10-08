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
    //Promisse BUSCAR POR ID Livro
    buscaPorId(id) {
        return new Promise((resolve, reject) =>{
            this._db.get(`
                SELECT * FROM livros WHERE id = ?
            `, 
            [id],
            (erro, livro) => {
                if (erro) {
                    return reject ('Não foi possivel encontrar o livro !');
                }
                    return resolve(livro);
               }
            );
        });
    }
    //Promisse Atualiza
    atualiza(livro) {
        return new Promise ((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET 
                    titulo = ?,
                    preco = ?,
                    descricao = ?
                WHERE id = ?
            `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
               erro  => {
                    if (erro) {
                        return reject ('Não foi possivel atualizar o livro!');
                    }
                    resolve();
            });
        });
    }
    //Promisse Remove Livro por ID
    remove(id) {
        return new Promise ((resolve, reject) => {
            this._db.get(`
                DELETE FROM livros WHERE id = ?
            `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject ('Nao foi possivel remover o Livro!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = LivroDao;


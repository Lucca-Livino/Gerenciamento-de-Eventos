import sqlite3  from "sqlite3"
import path from 'path';


const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'data', 'eventos.db'))


export function criarTableEventos(){
    const query =`
        CREATE TABLE IF NOT EXISTS eventos(
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        nome    TEXT,
        data   TEXT,
        local   TEXT,
        usuario_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
    `
    db.run(query, (erro) =>{
        if (erro){
            console.log (`Erro ao criar a tabela: ${erro}`)
        } else {
        }
    })
}

export async function inserirEvento(nome: string, data: string, local: string, usuario_id: number){
    const query = `
    INSERT INTO eventos(nome, data, local, usuario_id)
    VALUES (?, ?, ?, ?)
`;

    db.run(query, [nome, data, local, usuario_id], function(erro){
        if (erro){
            console.log(`Erro ao inserir dados: ${erro}`)
        }else{
            console.log(`Evento ${this.lastID} cadastrado com sucesso`)
        }
    } )
}

export function listarTodosEventos(){
    const query = `SELECT * FROM eventos`

    db.all(query, (erro, linhas )=> {
        if (erro) {
            console.log(`Erro ao listar dados: ${erro}`)
        }else{
            console.log(linhas)
        }
    })
}

export function listarEventoPorId(id: number){
    const query = `SELECT * FROM eventos WHERE id = ?`
    db.get(query, [id], (erro, linha) => {
        if (erro){
            console.log(`Erro ao listar usuario: ${erro}`)
        }else if(linha){
            console.log(linha)
        }else {
            console.log(`Nenhum usuário enconstrado com o id ${id}`)
        }
    })
}

export function alterarEvento(id: number, nome: string, data: string, local: string, usuario_id: number) {
    const query = `
    UPDATE eventos
    SET nome = ?, data = ?, local = ?, usuario_id = ?
    WHERE id = ?
    `;

    db.run(query, [nome, data, local, usuario_id, id], function (erro) {
        if (erro) {
            console.error(`Erro ao alterar o evento ${nome}: ${erro.message}`);
            return;
        }
        if (this.changes === 0) {
            console.log(`Evento com ID ${id} não encontrado.`);
        } else {
            console.log(`Dados do evento ${nome} alterados com sucesso!`);
        }
    });
}



export function deletarEvento(id: number){
    const query = `DELETE FROM eventos WHERE id = ?`
    db.run(query, [id], function (erro){
        if (erro) {
            console.log(`Erro ao deletar evento? ${erro}`)
        }else{
            console.log(`Evento ${id} deletado com sucesso`)
        }
    })
}





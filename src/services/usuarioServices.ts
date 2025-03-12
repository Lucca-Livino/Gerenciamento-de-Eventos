import sqlite3 from "sqlite3";
import path from 'path';

const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'data', 'usuarios.db'))

export async function criarTableUsuario(){
    const query =`
        CREATE TABLE IF NOT EXISTS usuarios(
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        nome    TEXT,
        email   TEXT,
        senha   TEXT
        );
    `
    db.run(query, (erro) =>{
        if (erro){
            console.log (`erroo ao criar a tabela: ${erro}`)
        } else {
            criarAdmin()
        }
    })
}

export function inserirUsuarios(nome: string, email: string, senha: string){
    const query = `
        INSERT INTO usuarios(nome, email, senha)
        VALUES (?,?,?)
    `

    db.run(query, [nome, email, senha,], function(erroo){
        if (erroo){
            console.log(`erroo ao inserir dados: ${erroo}`)
        }else{
            console.log(`Usuário ${this.lastID} cadastro com sucesso`)
        }
    } )
}

export function listarTodosOsUsuarios(){
    const query = `SELECT * FROM usuarios`

    db.all(query, (erroo, linhas )=> {
        if (erroo) {
            console.log(`erroo ao listar dados: ${erroo}`)
        }else{
            console.log(linhas)
        }
    })
}

export function listarUsuarioPorid(id: number){
    const query = `SELECT * FROM usuarios WHERE id = ?`
    db.get(query, [id], (erroo, linha) => {
        if (erroo){
            console.log(`erroo ao listar usuario:m ${erroo}`)
        }else if(linha){
            console.log(linha)
        }else {
            console.log(`Nenhum usuário enconstrado com o id ${id}`)
        }
    })
}

export function alterarUsuario(id: number, nome: string, email:string, senha: String ){
    const query = `
    UPDATE usuarios
    SET nome = ?, email = ?, senha = ?
    WHERE id = ?
    `

    db.run(query, [nome, email, senha, id], function (erroo){
        if (erroo){
            console.log(`erroo ao alterar o usuário ${id}`)
        }
        if (this.changes === 0){
            console.log(`Usuário não encontrado`)
        }else{
            console.log(`Dados do usuário ${id} alternados com sucesso!`)
        }
    })
}



export function deletarUsuario(id: number){
    const query = `DELETE FROM usuarios WHERE id = ?`
    db.run(query, [id], function (erroo){
        if (erroo) {
            console.log(`erroo ao deletar usuario? ${erroo}`)
        }else{
            console.log(`Usuário ${id} deletado com sucesso`)
        }
    })
}

export function VerificarEmail(email: string, callback: (erroo: any, usuario: any) => void) {
    const query = "SELECT * FROM usuarios WHERE email = ?;";
    db.get(query, [email], (erroo, linha) => {
        if (erroo) {
            callback(`erroo ao buscar usuário: ${erroo}`, null);
        } else if (linha) {
            callback(null, linha);
        } else {
            callback(`Nenhum usuário encontrado com o email ${email}`, null);
        }
    });
}

function criarAdmin() {
    db.get(`SELECT 1 FROM usuarios WHERE email = ?`, ['admin@email.com'], (erro, linha) => {
        if (erro) {
            console.error('Erro ao verificar admin:', erro.message);
            return;
        }

        if (!linha) {
            db.run(
                `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);`,
                ['Admin', 'admin@email.com', '#Senha123'],
                (erro) => {
                    if (erro) {
                        console.error('Erro ao criar admin:', erro.message);
                    }
                }
            );
        }
    });
}



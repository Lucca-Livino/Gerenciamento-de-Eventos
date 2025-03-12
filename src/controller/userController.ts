import { User } from "../models/userModel";
import { inserirUsuarios, listarTodosOsUsuarios, listarUsuarioPorid, deletarUsuario, alterarUsuario  } from "../services/usuarioServices";
import { UserSchema, idSchema } from "../validation/userValidacoes";
import { usuarioFake } from "../seeds/usuarioSeeds";

export async function createUser(nome: string, email: string, senha: string) {
    try {
        
        const user:User = {
            nome,
            email,
            senha,
        }
        UserSchema.parse(user)
        
        inserirUsuarios(user.nome, user.email, user.senha);
        
        console.log("Usuário criado com sucesso!");
    } catch (erro) {
       console.error(`Erro ao validar o usuario: ${erro}`);
    }
}

export function listAllUsers() {
    console.log('Aqui estão todos os Usuários');
    return listarTodosOsUsuarios();
}

export function listUserById(bodyUser: unknown) {
    try {
        console.log("Aqui está o Usuário que você está procurando:");
        const id = idSchema.parse(bodyUser)
        return listarUsuarioPorid(id);
    } catch (erro) {
        throw new Error(`Erro ao validar o ID: ${erro}`);
    }
}

export function updateUser(id: unknown, nome: string, email: string, senha: string) {
    try {
        const usuarioId = idSchema.parse(id);
        UserSchema.parse({ nome, email, senha });


        const usuario: User = {
            nome,
            email,
            senha,
        };

        alterarUsuario(usuarioId, usuario.nome, usuario.email, usuario.senha );
    } catch (erro) {
        console.error(`Erro ao atualizar o usuario: ${erro}`);
    }
}



export function deleteUser(bodyUser: unknown) {
    try {
        const id  = idSchema.parse(bodyUser);
        return deletarUsuario(id);
    } catch (erro) {
        throw new Error(`Erro ao validar o ID: ${erro}`);
    }
}

export function generateUser() {
    try {
        UserSchema.parse(usuarioFake);

        inserirUsuarios(usuarioFake.nome, usuarioFake.email, usuarioFake.senha);

        console.log("Usuário gerado e inserido com sucesso!");
    } catch (erro) {
        console.error(`Erro ao gerar usuário falso: ${erro}`);
    }
}
import { inserirEvento, listarTodosEventos, listarEventoPorId, deletarEvento, alterarEvento } from "../services/eventoServices";
import { idSchema } from "../validation/userValidacoes";
import { eventoSchema } from "../validation/eventoValidacoes";
import { Evento } from "../models/eventoModel";

export async function createEvent(nome: string, data: string, local: string, usuario_id: number) {
    try {
        eventoSchema.parse({ nome, data, local, usuario_id });

        const dataFormatada = new Date(data).toISOString();

        const evento: Evento = {
            nome,
            data: new Date(dataFormatada),
            local,
            usuario_id
        };

        inserirEvento(evento.nome, evento.data.toISOString(), evento.local, evento.usuario_id);

        console.log("Evento criado com sucesso!");
    } catch (erro) {
        console.error(`Erro ao validar o evento: ${erro}`);
    }
}

export function listAllEvent(){
    console.log('Aqui estão todos os Eventos');
    listarTodosEventos();
}

export function listEventById(evento: unknown) {
    try {
        console.log("Aqui está o evento que você está procurando:")
        const  id  = idSchema.parse(evento);
        return listarEventoPorId(id);
        
    } catch (erro) {
        throw new Error(`Erro ao validar o ID: ${erro}`);
    }
}

export function updateEvent(id: unknown, nome: string, data: string, local: string, usuario_id: number) {
    try {
        const eventoId = idSchema.parse(id);
        eventoSchema.parse({ nome, data, local, usuario_id });

        const dataFormatada = new Date(data).toISOString();

        const evento: Evento = {
            nome,
            data: new Date(dataFormatada),
            local,
            usuario_id
        };

        alterarEvento(eventoId, evento.nome, evento.data.toISOString(), evento.local, evento.usuario_id);
    } catch (erro) {
        console.error(`Erro ao atualizar o evento: ${erro}`);
    }
}




export function deleteEvent(evento: unknown) {
    try {
        const  id  = idSchema.parse(evento);
        return deletarEvento(id);
    } catch (erro) {
        throw new Error(`Erro ao validar o ID: ${erro}`);
    }
}
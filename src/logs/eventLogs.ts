import fs from 'fs'

export const Filepath: string = './data/logs.log'

export function SaveLogsEvents( usuario: string, acao: string) {
    try{
        const timestamp = new Date().toLocaleString();

        const logsEventsContent = `${timestamp} | ${usuario} | ${acao}\n`

        fs.appendFileSync(Filepath, logsEventsContent, 'utf-8')
    }catch(erro){
        console.error('Erro ao salvar o arquivo no logs')
    }
}
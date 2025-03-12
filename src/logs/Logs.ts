import fs from 'fs';
import path from 'path';

export function criarArquivoLog(): void {
  const pasta = path.join(__dirname, '..', '..', 'data'); 
  const nomeArquivo = 'logs.log';
  const caminhoCompleto = path.join(pasta, nomeArquivo);


  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
  }

  fs.writeFileSync(caminhoCompleto, 'utf8');

  console.log(`Arquivo de log criado em: ${caminhoCompleto}`);
}


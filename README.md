# Gentenciamento de Eventos

O projeto tem como objetivo criar um sistema básico no Typescript para gerenciar eventos, podendo também gerenciar os usuários do sistema utilizando o banco de dados SQLite. O sistema também contém o logs das ações do usuário

## Tecnologias 

* TypeScript

* Node.js

* SQLite

## Funções do Sistema

* Controle de Eventos: Possibilita a criação, visualização, busca por ID, edição e remoção de eventos.
* Gestão de Usuários: Permite cadastrar, visualizar, buscar por ID, modificar e excluir usuários.
* Registro de Atividades: Todas as operações realizadas em eventos e usuários (criação, atualização, exclusão) são armazenadas em um arquivo de logs, contendo o ID do log, email do usuário responsável, data/hora e a ação executada.
* Verificação de Dados: Inclui mecanismos para assegurar a integridade e correção das informações inseridas.
* Armazenamento com SQLite: Utiliza um banco de dados SQLite para garantir que os dados fiquem salvos.

## Como rodar esse programa

1. Clone o repositório
    * git clone https://github.com/Lucca-Livino/Gerenciamento-de-Eventos.git

2. Certifique-se que a pasta data existe
  * mkdir data

3. Instale as dependências
  * npm i

4. Certifique-se que está na pasta certa
  * cd src

5. Execute o código
  * npx tsx index.ts
  
6. Email e senha padrão para entrar no sistema pela primeira vez:

   * Email: admin@email.com
   * Senha: #Senha123

import chalk from 'chalk';
import { createUser, listAllUsers, listUserById, deleteUser, updateUser } from './controller/userController';
import { createEvent, listAllEvent, listEventById, deleteEvent, updateEvent } from './controller/eventController';
import { VerificarEmail } from './services/usuarioServices';
import { SaveLogsEvents } from './logs/eventLogs';
import { SaveLogsUser } from './logs/userLogs';
import { User } from './models/userModel';
import { criarTableEventos } from './services/eventoServices';
import { criarTableUsuario } from './services/usuarioServices';
import { criarArquivoLog } from './logs/Logs';
import { generateUser } from './controller/userController';

criarTableEventos()
criarTableUsuario()
criarArquivoLog()

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(chalk.bold.blue('----------- Gerenciamento de Eventos -----------'));

const Menu = () => {
    console.log(chalk.bold("Por favor, insira suas informações de login"));
    
    rl.question("Email: ", (emailLogin:string) => {
        rl.question("Senha: ", async (senhaLogin:string) => {
            VerificarEmail(emailLogin, (erro, usuario) => {
                if (erro) {
                    console.error(erro);
                    Menu();
                } else if (usuario && usuario.senha === senhaLogin) {
                    console.log(`Login realizado com sucesso! Seja bem-vindo ${usuario.nome}`);
                    menuPrincipal(usuario);
                } else {
                    console.log("Senha ou Usuário inválidos, por favor tente novamente");
                    Menu();
                }
            });
        });
    });
};

const menuPrincipal = (usuario: User) => {
    
    rl.question('Você gostaria de gerenciar Eventos ou Usuários: ', (resposta: string) => {
        switch (resposta.toLowerCase()) {
            case 'eventos':
                console.log('Digite o número da ação que gostaria de tomar');
                rl.question('1.Criar Eventos\n2.Listar Todos os Eventos\n3.Listar Evento por ID\n4.Alterar Evento\n5.Deletar Evento por ID\n6.Voltar\n7.Sair\n', (respostaEventos:string) => {
                    switch(respostaEventos) {
                        case '1':
                            rl.question('Nome do Evento: ', (nome: string) => {
                                rl.question('Data do evento (ANO-MÊS-DIA): ', (data: string) => {
                                    rl.question('Informe o local do evento: ', (local: string) => {
                                        try {
                                            createEvent(nome, data, local, usuario.id ?? 0);
                                            SaveLogsEvents(`ID: ${usuario.id} | Email: ${usuario.email}`, `Criou um evento`);
                                        } catch (erro) {
                                            console.error("Erro ao criar o evento", erro);
                                        } setTimeout(() => {
                                            console.log("Voltando ao menu principal...")
                                            menuPrincipal(usuario)
                                          }, 1500);
                                           
                                        
                                    });
                                });
                            });
                            break;
                        case '2':
                            listAllEvent();
                            SaveLogsEvents(`ID: ${usuario.id} | Email: ${usuario.email}`, `Listou todos os eventos`);
                            setTimeout(() => {
                                console.log("Voltando ao menu principal...")
                                menuPrincipal(usuario)
                              }, 1500);
                            break;
                        case '3':
                            rl.question("ID do Evento: ", (id:number) => {
                                try {
                                    listEventById(id);
                                    SaveLogsEvents(`ID: ${usuario.id} | Email: ${usuario.email}`, `Listou um evento com o id ${id}`);
                                } catch (erro) {
                                    console.error("Erro ao consultar o evento", erro);
                                } setTimeout(() => {
                                    console.log("Voltando ao menu principal...")
                                    menuPrincipal(usuario)
                                  }, 1500);
                            });
                            break;
                        case '4':
                            rl.question('ID do Evento a ser Alterado: ', (id: string) => {
                                rl.question('Novo Nome do Evento: ', (nome: string) => {
                                    rl.question('Nova Data do evento (ANO-MÊS-DIA): ', (data: string) => {
                                        rl.question('Novo Local do evento: ', (local: string) => {
                                            try {
                                                updateEvent(id, nome, data, local, usuario.id ?? 0);
                                                SaveLogsEvents(`ID: ${usuario.id} | Email: ${usuario.email}`, `Alterou um evento com o id ${id}`);
                                            } catch (erro) {
                                                console.error("Erro ao alterar o evento", erro);
                                            } setTimeout(() => {
                                                console.log("Voltando ao menu principal...")
                                                menuPrincipal(usuario)
                                              }, 1500);
                                        });
                                    });
                                });
                            })
                            break
                        case '5':
                            rl.question('ID do Evento a ser Deletado: ', (id:number) => {
                                try {
                                    deleteEvent(id);
                                    SaveLogsEvents(`ID: ${usuario.id} | Email: ${usuario.email}`, `Deletou um evento com o id ${id}`);
                                } catch (erro) {
                                    console.error("Erro ao deletar o evento", erro);
                                } setTimeout(() => {
                                    console.log("Voltando ao menu principal...")
                                    menuPrincipal(usuario)
                                  }, 1500);
                            });
                            break;
                        case '6':
                            menuPrincipal(usuario)
                            break
                        case '7':
                            rl.close()
                            break
                        default:
                            console.log(chalk.bold.red("Opção inválida, tente novamente."));
                            menuPrincipal(usuario);
                            return;
                    }
                });
                break;
            case 'usuarios':
                console.log('Digite o número da ação que gostaria de tomar');
                rl.question('1.Criar Usuários\n2.Listar Todos os Usuários\n3.Listar Usuário por I\n4.Alterar Usuário\n5.Deletar Usuário por ID\n6.Gerar usuário automaticamente\n7.Voltar\n8.Sair\n', (respostaUsuarios:string) => {
                    switch(respostaUsuarios) {
                        case '1':
                            rl.question('Nome do Usuário: ', (nome:string) => {
                                rl.question('Email do Usuário: ', (email:string) => {
                                    rl.question('Senha do Usuário: ', (senha:string) => {
                                        try {
                                            createUser(nome, email, senha);
                                            SaveLogsUser(`ID: ${usuario.id} | Email: ${usuario.email}`, `Criou um usuário`);
                                        } catch (erro) {
                                            console.error("Erro ao criar o Usuário", erro);
                                        } setTimeout(() => {
                                            console.log("Voltando ao menu principal...")
                                            menuPrincipal(usuario)
                                          }, 1500);
                                    });
                                });
                            });
                            break;
                        case '2':
                            try {
                                listAllUsers();
                                SaveLogsUser(`ID: ${usuario.id} | Email: ${usuario.email}`, `Listou todos os usuários`);
                            } catch (erro) {
                                console.error("Erro ao listar todos os usuários", erro);
                            } setTimeout(() => {
                                console.log("Voltando ao menu principal...")
                                menuPrincipal(usuario)
                              }, 1500);
                            break;
                        case '3':
                            rl.question("ID do Usuário: ", (id:number) => {
                                try {
                                    listUserById(id);
                                    SaveLogsUser(`ID: ${usuario.id} | Email: ${usuario.email}`, `Listou um usuário com o id ${id}`);
                                } catch (erro) {
                                    console.error("Erro ao consultar o Usuário", erro);
                                } setTimeout(() => {
                                    console.log("Voltando ao menu principal...")
                                    menuPrincipal(usuario)
                                  }, 1500);
                            });
                            break;
                        case '4':
                            rl.question('ID do Usuário a ser Alterado: ', (id: string) => {
                                rl.question('Novo Nome do Usuário: ', (nome: string) => {
                                    rl.question('Nova Email do Usuário: ', (email: string) => {
                                        rl.question('Nova Senha do Usuário: ', (senha: string) => {
                                            try {
                                                updateUser(id, nome, email, senha);
                                                SaveLogsUser(`ID: ${usuario.id} | Email: ${usuario.email}`, `Alterou um usuário com o id ${id}`);
                                            } catch (erro) {
                                                console.error("Erro ao alterar o evento", erro);
                                            } setTimeout(() => {
                                                console.log("Voltando ao menu principal...")
                                                menuPrincipal(usuario)
                                              }, 1500);
                                        });
                                    });
                                });
                            })
                        case '5':
                            rl.question('ID do Usuário a ser Deletado: ', (id:number) => {
                                try {
                                    deleteUser(id);
                                } catch (erro) {
                                    console.error("Erro ao deletar o Usuário", erro);
                                } setTimeout(() => {
                                    console.log("Voltando ao menu principal...")
                                    menuPrincipal(usuario)
                                  }, 1500);
                            });
                            break;
                        case '6':
                            generateUser()
                            break
                        case '7':
                            menuPrincipal(usuario)
                                break
                        case '8':
                                rl.close()
                            break
                        default:
                            console.log(chalk.bold.red("Opção inválida, tente novamente."));
                            menuPrincipal(usuario);
                            return;
                    }
                });
                break;
            default:
                console.log(chalk.bold.red("Opção inválida, tente novamente."));
                menuPrincipal(usuario);
                return;
        }
    });
};

Menu();

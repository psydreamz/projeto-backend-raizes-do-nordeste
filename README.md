# Raízes do Nordeste — API Back-end

Serviço back-end do sistema de gerenciamento multicanal para a rede de
lanchonetes Raízes do Nordeste. Expõe uma API REST responsável por
cadastro e autenticação de usuários, registro de pedidos e consulta
operacional pela cozinha e pela administração.

## Stack

| Camada         | Tecnologia          |
|----------------|---------------------|
| Runtime        | Node.js             |
| Framework HTTP | Express             |
| Persistência   | SQLite              |
| ORM            | Sequelize           |
| Criptografia   | Bcrypt.js           |
| Autenticação   | JWT                 |

## Execução local

Pré-requisito: Node.js instalado.

'''bash
git clone <url-do-repositorio>
cd <pasta-do-projeto>
npm install
npm run dev
'''

O banco SQLite é criado automaticamente na primeira execução — não é
necessário rodar scripts de criação de schema.

## API

| Método | Rota              | Descrição                                          |
|--------|-------------------|----------------------------------------------------|
| POST   | '/users/register' | Cadastro de usuário                                 |
| POST   | '/users/login'    | Autenticação; retorna token JWT                     |
| POST   | '/orders/create'  | Criação de pedido com simulação de pagamento (mock) |
| GET    | '/orders/all'     | Listagem de pedidos (Cozinha / Administração)       |

## Segurança e LGPD

- Senhas nunca são armazenadas em texto puro: aplica-se hash via Bcrypt.
- Acesso às rotas é restrito por perfil: 'ADMIN', 'COZINHA' e 'CLIENTE'.
- O fluxo de pagamento é simulado, portanto nenhum dado financeiro real
  trafega ou é persistido pela aplicação.

# Gerenciamento de Pessoas e Endereços - API

Esse projeto consiste em uma `API REST` com `NodeJS` e integração com banco de dados (SQL) `Postgres` para fazer cadastro de usuários e cadastrar endereços desses usuários.

## Como rodar:

- Clonar o repositório na pasta desejada;
- Garantir que tenha `node` e `npm` instalados - use os comandos `node -v` e `npm -v`;
- Garantir também que tenha `postgres` instalado e rodando com as seguintes configurações no arquivo `.env`:
  - `host`: `localhost`
  - `port`: 5432
  - `user`: `postgres`
  - `password`: _senha que você configurou no seu postgres_
  - `database`: _mesmo nome do seu banco de dados_
- Rodar o comando `npm install` para instalar as dependências do projeto;
- E por fim rodar o comando `npm run dev` para expor a aplicação na porta `3000`;

## Para rodar no Insomnia:

- Importar o arquivo `Insomnia_2023-04-04.json` no seu Insomnia e fazer os devidos teste.

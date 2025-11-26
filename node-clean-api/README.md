# Clean Products API

Backend Node.js/TypeScript seguindo princípios de Clean Architecture, autenticação JWT e documentação Swagger. Os dados são mantidos em memória usando o pattern de repositório para facilitar a troca futura para Postgres/MySQL.

## Tecnologias e escolhas
- **Express**: simplicidade e ecossistema rico.
- **TypeScript**: tipagem forte e manutenção.
- **Zod**: validação declarativa de schemas.
- **JWT**: autenticação stateless com roles no payload.
- **Helmet + CORS**: hardening de segurança.
- **Swagger (swagger-jsdoc + swagger-ui-express)**: documentação OpenAPI 3.
- **bcryptjs**: hashing de senha.

## Pré-requisitos
- Node.js LTS
- npm

## Instalação
```bash
npm install
```

## Configuração de ambiente
Crie um arquivo `.env` na raiz baseado no `.env.example`:
```
NODE_ENV=development
PORT=3000
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=*
DATABASE_URL=postgres://user:password@localhost:5432/app
```

## Execução
- Ambiente de desenvolvimento (watch):
```bash
npm run dev
```
- Build + produção:
```bash
npm run build
npm start
```

## Endpoints principais
- `POST /auth/register`
- `POST /auth/login`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id` (apenas admin)

## Swagger
Acesse `http://localhost:3000/docs` após iniciar o servidor. Configure o bearer token (JWT) no botão **Authorize** para testar as rotas protegidas.

## Troca do mock para Postgres/MySQL
- Implementar repositórios que implementem `IUsersRepository` e `IProductsRepository` usando ORM (Prisma, TypeORM) ou query builder (Knex).
- Substituir as instâncias `InMemoryUsersRepository` e `InMemoryProductsRepository` nas rotas pelas novas implementações.

## Segurança
- Ajuste `CORS_ORIGIN` para o domínio da aplicação frontend em produção.
- Armazene `JWT_SECRET` e credenciais de banco apenas em variáveis de ambiente seguras.
- Nunca logue senhas ou tokens completos.

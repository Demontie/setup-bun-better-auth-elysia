# Setup Bun + Better Auth + Elysia

Template para projetos Node.js com Bun, Elysia e autenticação JWT integrada.

## 🚀 Requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Bun](https://bun.sh/) - Runtime JavaScript/TypeScript
- [Docker](https://www.docker.com/) - Para containerização
- [Docker Compose](https://docs.docker.com/compose/) - Para orquestração de containers

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/setup-bun-better-auth-elysia.git
   cd setup-bun-better-auth-elysia
   ```

2. **Instale as dependências**
   ```bash
   bun install
   ```

3. **Configure as variáveis de ambiente**
   - Copie o arquivo `.env.example` para `.env`
   - Configure as variáveis conforme necessário

## 🐳 Executando com Docker

1. **Suba o banco de dados**
   ```bash
   docker compose up -d
   ```

2. **Execute as migrações**
   ```bash
   bun db:migrate
   ```

3. **Acesse o banco de dados (opcional)**
   ```bash
   bun db:studio
   ```
   - Acesse o Prisma Studio em: http://localhost:5555

4. **Inicie o servidor de desenvolvimento**
   ```bash
   bun dev
   ```
   - O servidor estará disponível em: http://localhost:3000

## 🧪 Executando os testes

```bash
bun test
```

## � Documentação da API

A documentação completa da API está disponível através do Swagger/OpenAPI em:

```
http://localhost:3000/openapi
```

## 🛠️ Exemplos de Uso

### Cadastrar um novo usuário

```bash
curl http://localhost:3000/auth/sign-up/email \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Seu Nome",
    "email": "seu.email@exemplo.com",
    "password": "suaSenha123"
  }'
```

### Fazer login

```bash
curl http://localhost:3000/auth/sign-in/email \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "seu.email@exemplo.com",
    "password": "suaSenha123"
  }'
```


## � Comandos disponíveis

- `bun dev` - Inicia o servidor de desenvolvimento
- `bun build` - Compila o projeto para produção
- `bun start` - Inicia o servidor em produção
- `bun test` - Executa os testes
- `bun db:migrate` - Executa as migrações do banco de dados
- `bun db:studio` - Abre o Prisma Studio para gerenciar o banco de dados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido por [Demontie Ferreira](https://github.com/demontie)
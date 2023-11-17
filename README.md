# Api Event

# Para usar esse aplicativo você deve:

1. Deixar somente o nome ".env" em vez de ".env.example";
2. Instalar o docker na sua máquina;
3. Abra o projeto (pode ser no vscode) e digite o comando: `docker compose up` (Esse comando serve para iniciar os serviços definidos no arquivo **docker-compose.yml**);
4. Digite outro comando para iniciar o servidor: `npm run dev`;
    
    **OBS:** Caso esse comando não esteja funcionando, é porque é necessário sincronizar o banco de dados, para isso é só usar o comando: `npx prisma migrate dev`.
    
5. Agora é so usar o postman ou outro programa de sua preferência para testar a API. A base das rotas é `http://localhost:3001/`, qualquer dúvida sobre quais são as rotas é só verificar no arquivo **routes.ts** dentro da pasta src;

## Stack utilizada

**Front-end:** React-Native

**Back-end:** NodeJS, FastifyApi, Docker, Mysql 


## Requisitos

- [NodeJs](https://nodejs.org/en/download)
- [Docker](https://www.docker.com/products/docker-desktop/)


## Instalação e start da aplicação

Instale o [NodeJs](https://nodejs.org/en/download)
 e o [Docker](https://www.docker.com/products/docker-desktop/)


Instale as dependências com npm install no diretorio do projeto
```bash
  npm install
```
Com o docker instalado suba o container através do comando abaixo do docker utlizando a imagem docker-compose
```bash
docker-compose up -d
```
Após subir o banco rode as migrations utilizando o comando 
```bash
npx prisma migrate dev
```

E para rodar a aplicação utilize o comando, com isso o server ficará escutando em http://localhost:3333
```bash
npm run start:dev
```

Caso não tenha nenhum workbench para modificar ou consultar o banco use
```bash
npx prisma studio
```

# dependencias
npm
nodejs

# comandos básicos
app npm init
app npm install express
app npm install bcryptjs
app npm install jsonwebtoken

# iniciando a aplicação
node app.js

# criando migração
app npx sequelize-cli migration:generate --name create-people-table
app npx sequelize-cli migration:generate --name create-users-table

# migrando modelos
app npx sequelize-cli db:migrate
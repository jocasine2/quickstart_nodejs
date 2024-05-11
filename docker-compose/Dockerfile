FROM node:20-bullseye

WORKDIR /app

RUN npm install -g npm@10.7.0
RUN npm install express
RUN npm install socket.io
RUN npm install pg sequelize sequelize-cli
RUN npm audit fix
EXPOSE 3000
CMD ["node", "index.js"]
FROM node:20-bullseye

WORKDIR /app

RUN npm install express
RUN npm install socket.io
RUN npm install -g npm@10.7.0
# Instalação limpa e eficiente das dependências
RUN npm install http-status-codes

EXPOSE 3000
CMD ["node", "index.js"]
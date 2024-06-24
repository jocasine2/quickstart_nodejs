FROM node:latest

WORKDIR /app

COPY ./app /app

# Instalação limpa e eficiente das dependências
RUN npm ci && npm install http-status-codes

EXPOSE 3000

CMD ["node", "index.js"]
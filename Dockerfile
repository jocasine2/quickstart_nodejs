FROM node:latest

WORKDIR /app

COPY ./app /app

RUN npm install

RUN rm -rf node_modules package-lock.json && npm install && npm install http-status-codes

EXPOSE 3000

CMD ["node", "index.js"]

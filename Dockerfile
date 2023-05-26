FROM node:latest

WORKDIR /app

COPY ./app /app

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]

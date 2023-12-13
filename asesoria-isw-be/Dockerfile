FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY .env ./

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]

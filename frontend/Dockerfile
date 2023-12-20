FROM node:14

WORKDIR /usr/src/app

COPY . .

COPY .env .

RUN npm install
RUN apt-get update
RUN apt-get install nano
RUN apt-get install net-tools

EXPOSE 3000

CMD ["npm", "start"]

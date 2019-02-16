FROM node:10.15.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prestart

EXPOSE 3001

CMD npm start

FROM node:19-alpine3.16

WORKDIR /usr/src/app

RUN npm install -g npm@9.8.1

COPY . ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]

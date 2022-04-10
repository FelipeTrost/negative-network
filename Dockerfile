FROM node:14

WORKDIR /usr/app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

EXPOSE 3030

CMD node src index.js
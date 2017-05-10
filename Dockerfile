FROM node:7
WORKDIR /app
RUN npm install nodemon -g
RUN npm install

EXPOSE 8090

CMD npm start

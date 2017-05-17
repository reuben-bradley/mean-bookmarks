FROM node:7
WORKDIR /app
RUN npm install nodemon -g

EXPOSE 8090

CMD npm install && npm start

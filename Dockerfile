FROM node:10

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install --only=prod

COPY . .

EXPOSE 3000

CMD npm start 

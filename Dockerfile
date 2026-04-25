FROM node:18-alpine

WORKDIR /var/www/html/todolist-backend-express

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build

CMD [ "node", "dist/main.js" ]
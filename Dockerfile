FROM node:16.13.0

WORKDIR /var/www/html/todolist-backend-express

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build
RUN npm run start:prod
FROM node:22.14-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
FROM node:carbon
RUN mkdir app
# Создать директорию app
COPY . /app/booksroutes-api
WORKDIR /app/booksroutes-api
RUN ls
RUN npm install
RUN npm run build
EXPOSE 1337
CMD [ "npm", "run","start:prod"]

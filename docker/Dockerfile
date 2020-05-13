FROM node:carbon
RUN mkdir app
# Создать директорию app
COPY . /app/booksroutesapi
WORKDIR /app/booksroutesapi
RUN npm install
RUN npm run build
EXPOSE 1337
CMD [ "npm", "run","start:prod"]

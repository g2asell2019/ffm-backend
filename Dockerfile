# Dockerfile  
FROM node:20
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ARG PORT=3030
ENV PORT=$PORT
EXPOSE $PORT

CMD npm run start
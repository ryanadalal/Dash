#  Dockerfile for Node Express Backend
FROM node:23.6-alpine

# Create App Directory
COPY . /app

# Working directory be app
WORKDIR /app

# Installing dependencies.
RUN npm i -g nodemon
RUN npm i

EXPOSE 5000

CMD ["npm","start"]
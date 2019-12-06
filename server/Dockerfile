FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm install
RUN npm ci --only=production
COPY . .
EXPOSE 9000
CMD [ "npm", "start" ]
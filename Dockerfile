# syntax=docker/dockerfile:1
   
FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["npm", "start"]
EXPOSE 3000
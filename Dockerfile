FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev"]



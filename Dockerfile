# Step 1: Build the application
FROM node:16 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# RUN npm run lint
# RUN npm run test
CMD ["npm", "run", "build"]
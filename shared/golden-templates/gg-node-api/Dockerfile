FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --ignore-scripts
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]

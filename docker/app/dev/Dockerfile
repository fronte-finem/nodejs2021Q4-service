FROM node:16-alpine AS dev
WORKDIR /app
COPY package.json .
RUN npm install --production \
    && npm install --global nodemon ts-node \
    && npm cache clean --force
# COPY src ./src

CMD ["nodemon", "--legacy-watch", "--exec", "ts-node src/server.ts"]

# esbuild bundle not working for fastify (╯°□°）╯︵ ┻━┻

FROM node:16-alpine AS base
WORKDIR /app

FROM base AS build
COPY package.json .
RUN npm install --production \
    && npm install --global esbuild \
    && npm cache clean --force
COPY . .
RUN esbuild src/server.ts --bundle --minify --platform=node --target=node16 --outfile=dist/server.js

FROM base AS prod
RUN npm install dotenv
COPY --from=build /app/dist/server.js ./server.js

CMD ["node", "-r", "dotenv/config", "server.js"]

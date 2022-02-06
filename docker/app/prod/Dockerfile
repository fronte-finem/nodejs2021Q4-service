# TODO: complete prod image

# FROM node:16-alpine AS base
# WORKDIR /app
#
# FROM base AS build
# COPY package.json .
# RUN npm install \
#     && npm cache clean --force
# COPY . .
# RUN npm run build
#
# FROM base AS prod
# RUN npm install dotenv
# COPY --from=build /app/dist ./dist
#
# CMD ["node", "-r", "dotenv/config", "dist/src/main.js"]

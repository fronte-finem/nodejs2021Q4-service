FROM node:16-alpine AS dev

WORKDIR /app

COPY ./package.json ./subset.config.js ./

RUN apk update \
    && apk upgrade \
    && apk add git --no-cache \
    && npm install --global github:tabrindle/install-subset \
    && subset install docker --npm \
    && npm uninstall --global github:tabrindle/install-subset \
    && npm cache clean --force \
    && apk del git \
    && rm -rf /var/cache/apk/*

COPY . .

CMD ["sh","-c","ping localhost"]
CMD ["sh","-c","npm run prisma:build && npx nest start --watch --exec \"node -r dotenv/config\""]

FROM node:16-alpine AS dev

WORKDIR /app

COPY ./package.json ./

RUN npm install \
    && npm install --global typescript ts-node @nestjs/cli prisma \
    && npm cache clean --force \

COPY . .

CMD ["sh","-c","prisma migrate dev && prisma db seed && nest start --exec \"node -r dotenv/config\""]

FROM postgres:14-alpine as database

RUN apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*

WORKDIR /database

CMD ["postgres"]

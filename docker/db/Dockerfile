FROM postgres:14-alpine as database
RUN apk update \
    && apk upgrade
WORKDIR /database

CMD ["postgres"]

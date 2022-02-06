## Description

REST service — education project from [RS School][rs.school] for course [Nodejs 2021Q4][course]


## Prerequisites

- Git - [Download & Install Git][git].
- Docker - [Download & Install Docker][docker].

## Installation

```bash
# clone project
$ git clone https://github.com/fronte-finem/nodejs2021Q4-service.git

# go to project directory
$ cd ./nodejs2021Q4-service

# optional - select some feature branch
$ git checkout {some-feature-branch}

# installing dependencies
$ npm install
```

## Running the app

```bash
# development watch mode
$ npm run start:dev

# development watch + debug mode
$ npm run start:debug

# development static mode
$ npm run start

# production mode
$ npm run start:prod
```

After starting the app on port (`4000` as default) you can open
in your browser OpenAPI documentation by typing [localhost:4000/doc](http://localhost:4000/doc).
*For more information about OpenAPI/Swagger please visit [swagger.io](https://swagger.io/)*.

### Routes:

```
GET /
GET /doc

POST /login

POST /file
GET /file/{filename}

POST /users
GET /users
GET /users/{id}
PUT /users/{id}
DELETE /users/{id}

POST /boards
GET /boards
GET /boards/{id}
PUT /boards/{id}
DELETE /boards/{id}

POST /boards/{boardId}/columns
GET /boards/{boardId}/columns
GET /boards/{boardId}/columns/{id}
PUT /boards/{boardId}/columns/{id}
DELETE /boards/{boardId}/columns/{id}

POST /boards/{boardId}/tasks
GET /boards/{boardId}/tasks
GET /boards/{boardId}/tasks/{id}
PUT /boards/{boardId}/tasks/{id}
DELETE /boards/{boardId}/tasks/{id}
```


## Test

```bash
# e2e tests
$ npm run test

# e2e authentication tests
$ npm run test:auth

# artillery load tests
$ npm run test:load
```

### [Artillery](https://artillery.io/) report
- Endpoint: `users`
- Mode: `production`
- Log level: `ERROR`

<table>
  <tr>
    <th>
      Express
    </th>
    <th>
      Fastify
    </th>
  </tr>
  <tr>
    <td>
<pre>
errors.ETIMEDOUT: .................... 4046
http.codes.200: ...................... 20570
http.codes.201: ...................... 4928
http.codes.204: ...................... 3678
http.codes.404: ...................... 3678
http.codes.409: ...................... 562
http.request_rate: ................... 146/sec
http.requests: ....................... 37462
http.response_time:
  min: ............................... 0
  max: ............................... 9996
  median: ............................ 7
  p95: ............................... 8520.7
  p99: ............................... 9607.1
http.responses: ...................... 33416
vusers.completed: .................... 3678
vusers.created: ...................... 8286
vusers.created_by_name.CRUD cycle: ... 8286
vusers.failed: ....................... 4608
vusers.session_length:
  min: ............................... 3153.1
  max: ............................... 23808.1
  median: ............................ 5826.9
  p95: ............................... 20958.1
  p99: ............................... 22703.7
</pre>
    </td>
    <td>
<pre>
errors.ETIMEDOUT: .................... 4326
http.codes.200: ...................... 19272
http.codes.201: ...................... 4518
http.codes.204: ...................... 3266
http.codes.404: ...................... 3275
http.codes.409: ...................... 491
http.request_rate: ................... 139/sec
http.requests: ....................... 35360
http.response_time:
  min: ............................... 0
  max: ............................... 9999
  median: ............................ 7
  p95: ............................... 8520.7
  p99: ............................... 9801.2
http.responses: ...................... 30822
vusers.completed: .................... 3275
vusers.created: ...................... 8303
vusers.created_by_name.CRUD cycle: ... 8303
vusers.failed: ....................... 4817
vusers.session_length:
  min: ............................... 3148.8
  max: ............................... 23354
  median: ............................ 4492.8
  p95: ............................... 21813.5
  p99: ............................... 22703.7
</pre>
    </td>
  </tr>
</table>


[rs.school]: https://rs.school/
[course]: https://rs.school/nodejs/
[git]: https://git-scm.com/downloads
[docker]: https://hub.docker.com/search?type=edition&offering=community&operating_system=linux%2Cwindows%2Cmac
[nodejs]: https://nodejs.org/en/download/
[vsc-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vsc-prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

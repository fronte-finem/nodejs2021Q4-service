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
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

After starting the app on port (`4000` as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
*For more information about OpenAPI/Swagger please visit https://swagger.io/*.

## Test

```bash
# e2e tests
$ npm run test

# e2e authentication tests
$ npm run test:auth
```

## Dependencies

<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


[rs.school]: https://rs.school/
[course]: https://rs.school/nodejs/
[git]: https://git-scm.com/downloads
[docker]: https://hub.docker.com/search?type=edition&offering=community&operating_system=linux%2Cwindows%2Cmac
[nodejs]: https://nodejs.org/en/download/
[vsc-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vsc-prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

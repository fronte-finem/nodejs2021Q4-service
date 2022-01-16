# RS School REST service

- [Base setup](#base-setup)
- [Development](#development)
- [Testing](#testing)

[git]: https://git-scm.com/downloads
[docker]: https://hub.docker.com/search?type=edition&offering=community&operating_system=linux%2Cwindows%2Cmac
[nodejs]: https://nodejs.org/en/download/
[vsc-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vsc-prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## Base setup
  - Prerequisites
    - Git - [Download & Install Git][git].
    - Docker - [Download & Install Docker][docker].
    - ```shell
      git clone https://github.com/fronte-finem/nodejs2021Q4-service.git
      ```
    - ```shell
      cd ./nodejs2021Q4-service
      ```
    - ```shell
      git checkout {some-feature-branch}
      ```
  - Running app
    - ```shell
      docker-compose up
      ```
    - After starting the app on port (`4000` as default) you can open
      in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
      *For more information about OpenAPI/Swagger please visit https://swagger.io/*.

## Development
  - Prerequisites
    - [Base setup](#base-setup) prerequisites
    - Node.js LTS v16.13.1 - [Download & Install Node.js][nodejs]
  - Installing NPM modules
    - ```shell
       npm install
      ```
  - Auto-fix and format
    - ```shell
       npm run lint
      ```
  - If you're using VSCode:
    - you can get a better developer experience from integration with [ESLint][vsc-eslint] and [Prettier][vsc-prettier] extensions.
    - Debugging: press <kbd>F5</kbd>. For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Testing
  - Prerequisites
    - [Base setup](#base-setup) prerequisites
    - Node.js LTS v16.13.1 - [Download & Install Node.js][nodejs]
  - Installing NPM modules
    - ```shell
         npm install
        ```
  - Running app
    - ```shell
        docker-compose up
        ```
  - After application running open new terminal and enter:
    - To run all tests without authorization
      ```shell
      npm run test
      ```
    - To run only one of all test suites (users, boards or tasks)
      ```shell
      npm run test <suite name>
      ```
    - To run all test with authorization
      ```shell
      npm run test:auth
      ```
    - To run only specific test suite with authorization (users, boards or tasks)
      ```shell
      npm run test:auth <suite name>
      ```

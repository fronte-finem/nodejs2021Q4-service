# RS School REST service

## Base setup
  - Prerequisites
    - Git - [Download & Install Git](https://git-scm.com/downloads).
    - Docker - [Download & Install Docker](https://hub.docker.com/search?type=edition&offering=community&operating_system=linux%2Cwindows%2Cmac).
    - ```shell
      git clone https://github.com/fronte-finem/nodejs2021Q4-service.git
      cd ./nodejs2021Q4-service
      git checkout {some-feature-branch}
      ```
  - Running app
    - ```shell
      docker-compose up --build
      ```
    - After starting the app on port (4000 as default) you can open
      in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
      For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Development
  - Prerequisites
    - [Base setup](#base-setup) prerequisites
    - Node.js LTS v16.13.1 - [Download & Install Node.js](https://nodejs.org/en/download/)
    - Installing NPM modules
      ```shell
      npm install
      ```
  - Auto-fix and format
    ```shell
    npm run lint
    ```
  - If you're using VSCode:
    - you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.
    - Debugging: press <kbd>F5</kbd>. For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Testing
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

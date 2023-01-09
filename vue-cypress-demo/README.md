# Vue Cypress Demo
## Install Cypress in existing project
    npm install cypress -D
    
## Add tests
Add tests in FILENAME.js files in `/tests/e2e/specs`.

## Run Cypress (Headless)
    npm run serve
    npx cypress run
    
## Run Cypress in test runner
    npm run serve
    npx cypress open

## Configure eslint to prevent .only()
Accidentally committing an instance of `.only()` and thus running only one single test instead of your whole test suite is a really bothersome mistake that is easy to make.

This is why it is definitely worth it to install a plugin that designates any `.only()` a linting error: [eslint-plugin-no-only-tests](https://www.npmjs.com/package/eslint-plugin-no-only-tests)
### Install eslint-plugin-no-only-tests
    npm install --save-dev eslint-plugin-no-only-tests

### Configure .eslintrc:

    "plugins": [
        "no-only-tests"
    ]
    "rules": {
        "no-only-tests/no-only-tests": "error"
    }
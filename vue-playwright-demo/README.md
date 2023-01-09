# Vue Playwright Demo
## Install Playwright in existing project
    npm install --save-dev @playwright/test
    
## Add tests
Add tests in FILENAME.spec.js files

## Configure playwright
The details of how playwright is run is configured in `/playwright.config.ts`.

## Run Playwright (Headless)
    npm run serve
    npx playwright test
    
## Run Playwright in test runner
    npm run serve
    npx playwright test --debug

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
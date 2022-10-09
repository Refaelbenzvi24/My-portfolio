# Documentation

## Table Of Content

- [Documentation](#documentation)
  - [Table Of Content](#Table-Of-Content)
  - [Running the project](#Running-the-project)
  - [Usage](#usage)
    - [Using your own data](#Using-your-own-data)
    - [Disabling animations in development](#Disabling-animations-in-development)
  - [Contributing](#Contributing)
  - [Scripts](#Scripts)

## Running the project

> requires Node >= 14

clone the repo `git clone git@github.com:Refaelbenzvi24/My-portfolio.git`

then

```bash
cd My-portfolio
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
pnpm run dev
```

And, enjoy :)

## Usage

### Using your own data

All the data is stored in `data.ts` file, you can change it to your own data.

I have used i18next for internationalization, so you'll need to edit
the `public/locales/${your language}/translation.yaml` file to change the text.

### Disabling animations in development

go to `src/modules/vars.ts` and change the following in line 31:

```ts
Vars.showAnimations = envVars.VITE_ENV === 'production' || true
```

to

```ts
Vars.showAnimations = envVars.VITE_ENV === 'production' || false
```

## Contributing

Feel free to submit PRs for small issues. For large issues or features, open an issue first.

### Option 1 - Simple Typo Fixes

For small issues, like a typo or broken link, use Github's inline file editor or web editor (open by pressing <kbd>
.</kbd> in your fork's code tab) to make the fix and submit a pull request.

### Option 2 - Work on your own Fork

For more complex contributions, like new features, you should work on the project on your local system.

First, follow the steps in [Running the project](https://github.com/Refaelbenzvi24/My-portfolio#running-the-project).

```shell
git checkout -b my-fix
# fix some code / add feature...

git commit -m "fix: corrected a typo"
git push origin my-fix
```

Lastly, open a pull request on GitHub.

## Scripts

- `pnpm start` - build and start production server
- `pnpm start:test` - build and start production server in test mode.
- `pnpm build` - build for production. The generated files will be on the `dist` folder.
- `pnpm build:test` - build for testing. The generated files will be on the `tests/dist` folder.
- `pnpm serve` - locally start the production build.
- `pnpm serve:test` - locally start the testing build.
- `pnpm clean` - clean build directory
- `pnpm commit` - commit using commitizen
- `pnpm dev` - start a development server with hot reload.
- `pnpm dev:test` - start a development server with hot reload in test mode - used for running cypress tests with
  coverage.
- `extract-translations` - extract translations from source files using `i18next`. configuration file for this is
  on `i18next-parser.config.js`. The generated files will be on the `public/locales` folder.
- `pnpm lint` - runs TypeScript and ESLint.
- `pnpm lint:eslint` - runs ESLint.
- `pnpm lint:tsc` - runs TypeScript.
- `pnpm test` - run unit tests.
- `pnpm test:ci` - run all unit and integration tests in CI mode.
- `pnpm test:e2e` - run all e2e tests with the Cypress Test Runner.
- `pnpm test:e2e:headless` - run all e2e tests headlessly.
- `pnpm test:e2e:ci` - run all e2e tests for CI Environment.
- `pnpm coverage:jest` - open the coverage report in the browser for jest.
- `pnpm coverage:cypress` - open the coverage report in the browser for cypress.
- `pnpm validate` - runs `lint`, `test:ci` and `test:e2e:ci`.

# OneBoard UI


This codebase is for the frontend of OneBoard.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Pre-requisites

- Node v19.5+

### Folder structure

```
└── src
   ├── assets: Icons and Images.
   ├── components: Reusable React functions used to build pages.
   ├── constants: All constants and enum definition.
   ├── mocks: All the mocks needed for testing the components.
   ├── pages: Contains the navigation page and main page.
   ├── utils: Helper functions used across components and services.
   ├── index.css: Global css file.
   └── index.tsx: Entry file for the react app.
```

## How to run the frontend server locally -

In the project directory, you can:

### Install packages

```shell script
npm install
```

### Start the frontend server

```shell script
npm run start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

## Additional operations

### Run unit tests

```shell script
npm run test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Check test coverage

```shell script
npm test:coverage
```

It will show the coverage report.

## To build the app
```
npm run build
```

## To start the local dev server
```
npm run start
```
## To start the compiled node server
```
node dist/.
```
## To test
Unit tests are run with jasmine

```
npm run test
```

## To Lint
Runs prettier and fixes any stylistic issues found
```
npm run prettier
```

Runs eslint and outputs issues to the console for those to be fixed at your leisure.
```
npm run lint
```

## Endpoints

/api/images
Takes a filename, width and height as query params
Ex: GET /api/images?filename=abc&width=200&height=200
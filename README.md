# buku-name dictionary

[Mini](https://minilanguage.com/) - English dictionary.

## Development

To run it you need at least:

- Node 18.
- Go 1.21.

To begin install dependencies using NPM:

```
npm i
```

Now you can start up a server for development:

```
npm start
```

This will lint the code and make the page available at `http://localhost:9000/`.

### Build

To build everything for release or deployment use:

```
npm run build
```

### Utilities

The project includes other commands to aid development.

To see the page in any other device in your local netwrok you can use the following command:

```
npm run start:open
```

This will make the page available under `<IP of the device running the dev server>:9000`. Good for testing in mobile devices.

The command `npm run start:prod` does the same but uses production mode (more optimizations).

#### Linting

To project uses ESLint, to run it use:

```
npm run lint
```

#### Checking dictionary integrity

To check that the dictionary does not have duplicate entries:

```
npm run check
```

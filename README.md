# contract-template

Use this pre-configured template for smart contract projects on Goerli network.

Features:

- Truffle Framework
- Ganache (development)
- Infura
- Web3

## Setup

Requirements:

- Node >= v12
- Yarn

```
npm i -g yarn       # Install yarn if you don't already have it
yarn install        # Install dependencies
yarn setup          # Setup Git hooks
```

## Testing

First, make sure Ganache is running.

```
yarn ganache
```

Compile

```
yarn compile
```

Run all tests:

```
yarn test
```

To run tests in a specific file, run:

```
yarn test [path/to/file]
```

Deploy by connecting to Infura node (specific provider)

`⚠️ You have to set up all the environment variables before doing this step`

```
yarn deploy
```

---

MIT License

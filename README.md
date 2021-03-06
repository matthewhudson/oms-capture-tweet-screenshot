# Microservice template for NodeJS

![Microservice](https://img.shields.io/badge/microservice-ready-brightgreen.svg?style=for-the-badge)
[![Build status](https://img.shields.io/travis/com/microservices/node/master.svg?style=for-the-badge)](https://travis-ci.com/microservices/node)

An OMS template for NodeJS + ExpressJS.

## Setup

Latest LTS version of Node.js 10.
[See Releases](https://nodejs.org/en/about/releases/).

```sh
yarn
```

First, install the [Commitizen cli](https://github.com/commitizen/cz-cli) tools:

```shell
npm install commitizen -g
```

Next, initialize your project to use the `cz-conventional-changelog` adapter by
typing

```sh
commitizen init cz-conventional-changelog --yarn --dev --exact
```

Use the following to replace `git commit`:

```sh
yarn run commit
```

## Test

## OMS Test Runner

```sh
omg run capture \
  -a url=https://twitter.com/jamessocol/status/717902576210067456 \
  -e AWS_ACCESS_KEY_ID=XXXXXXXXXX \
  -e AWS_SECRET_ACCESS_KEY=XXXXXXXXXX \
  -e AWS_S3_BUCKET_NAME=XOXOXO
```

```
ℹ Building Docker image
…
✔ Built Docker image with name: omg/l2hvbwuvc2vil2fzew5jes9ydwj5
✔ Started Docker container: 1c8a91688261
✔ Health check passed
✔ Ran action: `message` with output: {"message":"Hello Service"}
✔ Stopped Docker container: 1c8a91688261
```

## cUrl

```bash
curl -X POST \
  http://localhost:8080/capture-tweet-screenshot \
  -H 'Content-Type: application/json' \
  -d '{ "url": "https://twitter.com/storyscript_/status/1174745271189856257" }'
```

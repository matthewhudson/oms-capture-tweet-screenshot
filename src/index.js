#!/usr/bin/env node

const screenshotTweet = require('screenshot-tweet').default
const { isValidTweetUrl, generateFilenameFromUrl } = require('./helpers')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 8080

const message = {
  success: false
}

app.all('/*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.post('/tweet', (req, res) => {
  const { url } = req.body

  if (!isValidTweetUrl(url)) {
    message.error = `The ${url} is not valid.`
    res.status(500).json(message)
  }

  const fileName = generateFilenameFromUrl(url)

  screenshotTweet(url, fileName)
    .then(() => {
      message.success = true
      message.url = 'https://urlpip.es'
      res.json(message)
    })
    .catch(er => {
      // @TODO: Log
      message.error = `[500] ${er.message}`
      res.status(500).json(message)
    })
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(port, () =>
  console.log(`Listening on localhost: http://localhost:${port}`)
)

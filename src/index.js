#!/usr/bin/env node

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { actionHandler } = require('./actions')

app.use(bodyParser.json())

const port = process.env.PORT || 8080

const message = {
  success: false
}

app.all('/*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.post('/capture-tweet-screenshot', (req, res) => {
  const { url } = req.body

  actionHandler(url)
    .then(url => {
      message.success = true
      message.url = url
      res.json(message)
    })
    .catch(er => {
      // @TODO: Log
      message.error = `[500] ${er}`
      res.status(500).json(message)
    })
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(port, () =>
  console.log(`Listening on localhost: http://localhost:${port}`)
)

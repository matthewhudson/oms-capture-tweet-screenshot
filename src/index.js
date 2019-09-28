#!/usr/bin/env node

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const port = process.env.PORT || 8080

app.post('/message', (req, res) => {
  const { name } = req.body
  res.json({ message: `Hello ${name}` })
})

app.get('/health', (req, res) => res.send('OK'))

app.listen(port, () =>
  console.log(`Listening on localhost: http://localhost:${port}`)
)

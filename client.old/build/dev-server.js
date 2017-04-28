const fs = require('fs')
const path = require('path')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')

const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()
const port = process.env.PORT || 8080


app.use(proxyMiddleware('/api', {target: 'http://localhost:3000'}));

require('../../server/middlewares/renderer')(app);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

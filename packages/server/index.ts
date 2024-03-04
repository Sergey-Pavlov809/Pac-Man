import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/index'
import { createProxyMiddleware } from 'http-proxy-middleware'
import bodyParser from 'body-parser'

import express from 'express'
import { dbConnect } from './db'

const isProduction = process.env.NODE_ENV === 'production'
if (!isProduction) {
  dotenv.config()
}

const app = express()
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
)
app.use(
  '/api/v2',
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': '',
    },
    target: 'https://ya-praktikum.tech',
  })
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = Number(process.env.SERVER_PORT) || 3001

dbConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})

app.use(router)

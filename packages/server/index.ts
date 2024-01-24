import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { createServer as createViteServer } from 'vite'
// eslint-disable-next-line no-duplicate-imports
import type { ViteDevServer } from 'vite'

dotenv.config()

import express, { Request, Response } from 'express'
import { createClientAndConnect } from './db'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  createClientAndConnect()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const isDev = () => process.env.NODE_ENV === 'development'
  const pathToShared = path.join(__dirname, '../shared')
  const pathToClient = path.join(__dirname, '../client')
  let vite: ViteDevServer | undefined

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: pathToClient,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.use(express.static(path.join(pathToShared, 'dist'), { index: false }))

  app.use('/', async (req: Request, res: Response) => {
    const url = req.originalUrl
    let template: string

    if (isDev()) {
      template = await fs.readFile(
        path.resolve(pathToClient, 'index.html'),
        'utf-8'
      )

      template = await vite!.transformIndexHtml(url, template)
    } else {
      template = await fs.readFile(
        path.join(pathToShared, 'dist/index.html'),
        'utf-8'
      )
    }

    let render: () => Promise<string>
    if (isDev()) {
      render = (
        await vite!.ssrLoadModule(
          path.resolve(pathToClient, 'src/entry-server.tsx')
        )
      ).render
    } else {
      const pathToServer = require.resolve(
        path.join(pathToShared, '/ssr-build/entry-server.cjs')
      )
      render = (await import(pathToServer)).render
    }

    const appHtml = await render()
    const html = template.replace('<!--app-html-->', appHtml)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()

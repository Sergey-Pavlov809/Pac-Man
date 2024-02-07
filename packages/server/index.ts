import dotenv from 'dotenv'
import cors from 'cors'
import { type ViteDevServer, createServer as createViteServer } from 'vite'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const isDev = (): boolean => process.env.NODE_ENV === 'development'

async function startServer(): Promise<void> {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined

  const distPath = !isDev()
    ? path.dirname(require.resolve('client/dist/index.html'))
    : ''
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = !isDev()
    ? require.resolve('client/dist-ssr/client.cjs')
    : ''

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
      }

      const { render } = !isDev()
        ? await import(ssrClientPath)
        : await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))

      const { initialStore, renderResult, styleText } = await render(url)

      template = template.replace('<!--ssr-outlet-->', renderResult)
      template = template.replace('<!--ssr-styles-->', styleText)
      template = template.replace(
        '<!--store-data-->',
        JSON.stringify(initialStore).replace(/</g, '\\u003c')
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()

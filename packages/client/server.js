import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const isDev = process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.CLIENT_PORT) || 3000

  let vite

  if (isDev) {
    const { createServer } = await import('vite')

    vite = await createServer({
      root: process.cwd(),
      server: { middlewareMode: true },
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app
      .use('/assets', express.static(path.resolve('dist/client', 'assets')))
      .use(
        '/serviceWorker.js',
        express.static(path.resolve('dist/client', 'serviceWorker.js'))
      )
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template
      let render

      if (!isDev) {
        template = fs.readFileSync(
          path.resolve('./dist/client/index.html'),
          'utf-8'
        )
        render = (await import('./dist/server/entry-server.js')).render
      } else {
        template = fs.readFileSync(path.resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('src/entry-server.tsx')).render
      }

      const { initialStore, renderResult, styleText } = await render(url)

      template = template.replace('<!--ssr-outlet-->', renderResult)
      template = template.replace('<!--ssr-styles -->', styleText)
      template = template.replace(
        '<!--store-data-->',
        JSON.stringify(initialStore).replace(/</g, '\\u003c')
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      if (isDev) {
        vite.ssrFixStacktrace(e)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Frontend server is listening on port: ${port}`)
  })
}

startServer()

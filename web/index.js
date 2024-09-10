// @ts-check
import 'dotenv/config'
import { join } from 'path'
import { readFileSync } from 'fs'
import express from 'express'
import serveStatic from 'serve-static'
import axios from 'axios'

import shopify from './shopify.js'
// import productCreator from './product-creator.js' TODO: rm unused code
import GDPRWebhookHandlers from './gdpr.js'

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || '3000',
  10
)

const STATIC_PATH =
  process.env.NODE_ENV === 'production'
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`

const ONE_ACCOUNT_API_URL = process.env.ONE_ACCOUNT_API_URL

const app = express()

//elastic beanstalk health check
app.get('/health', (req, res) => {
  res.status(200)
  res.send('OK')
})
// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin())

app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  async (req, res, next) => {
    const shop = new URLSearchParams(req.url).get('shop')

    res.cookie('shopOrigin', shop, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
    })

    const accessToken = res.locals.shopify.session.accessToken

    try {
      const response = await axios.post(
        `${ONE_ACCOUNT_API_URL}/platforms/shopify/create`,
        {
          shop,
          token: accessToken,
        }
      )
    } catch (error) {
      console.log('ERROR 111: ', error)
    }

    next()
  },
  shopify.redirectToShopifyOrAppRoot()
)
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
)

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use('/api/*', shopify.validateAuthenticatedSession())

app.use(express.json())

app.use(shopify.cspHeaders())
app.use(serveStatic(STATIC_PATH, { index: false }))

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(readFileSync(join(STATIC_PATH, 'index.html')))
})

app.listen(PORT)

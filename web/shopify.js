import { LATEST_API_VERSION } from '@shopify/shopify-api'
import { shopifyApp } from '@shopify/shopify-app-express'
import { restResources } from '@shopify/shopify-api/rest/admin/2023-07'

const ONE_ACCOUNT_SHOPIFY_APP_URL = process.env.ONE_ACCOUNT_SHOPIFY_APP_URL
const isProduction = process.env.NODE_ENV === 'production'

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
    ...(isProduction && {
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecretKey: process.env.SHOPIFY_API_SECRET,
      hostScheme: 'https',
      hostName: ONE_ACCOUNT_SHOPIFY_APP_URL,
    }),
  },
  auth: {
    path: '/api/auth',
    callbackPath: '/api/auth/callback',
  },
  webhooks: {
    path: '/api/webhooks',
  },
})

export default shopify

import { LATEST_API_VERSION } from '@shopify/shopify-api'
import { shopifyApp } from '@shopify/shopify-app-express'
// import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04'

// const DB_PATH = `${process.cwd()}/database.sqlite`;

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    // scopes: ['your_scopes'],
    // hostScheme: 'http', dependant on node env
    hostName: 'test-shopify.1accountqa.net',
  },
  auth: {
    path: '/api/auth',
    callbackPath: '/api/auth/callback',
  },
  webhooks: {
    path: '/api/webhooks',
  },
  // This should be replaced with your preferred storage strategy
  // sessionStorage: new SQLiteSessionStorage(DB_PATH),
})

export default shopify

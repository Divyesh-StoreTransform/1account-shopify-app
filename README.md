# 1Account Shopify App

Built using [Shopify App Template for Node](https://github.com/Shopify/shopify-app-template-node).

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

#### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

```shell
npm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.

## Deployment

Two .env files are required. You can check the previously used files by downloading the source file from AWS Elastic Beanstalk from a previous version.

One at root with the following vars:
- SHOPIFY_API_SECRET
- SHOPIFY_API_KEY
- SCOPES=write_customers,write_orders
- ONE_ACCOUNT_API_URL
- ONE_ACCOUNT_SHOPIFY_APP_URL
- NODE_ENV=production

The second is located at ./web/frontend/ and includes the following vars:
- VITE_ONE_ACCOUNT_WEBAPP_URL
- VITE_ONE_ACCOUNT_API_URL

Ensure the shell files are executable

```shell
find .platform/* -type f -print0 | xargs -0 git update-index --chmod=+x
```

Run the zip command from root. This will create a zip file named "shopify-app.zip". Upload this file to AWS Elastic Beanstalk.

```shell
npm run zip
```

### Application Storage

Application storage is currently not in use.

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [Shopify API Library documentation](https://github.com/Shopify/shopify-api-js#readme)
- [Getting started with internationalizing your app](https://shopify.dev/docs/apps/best-practices/internationalization/getting-started)
  - [i18next](https://www.i18next.com/)
    - [Configuration options](https://www.i18next.com/overview/configuration-options)
  - [react-i18next](https://react.i18next.com/)
    - [`useTranslation` hook](https://react.i18next.com/latest/usetranslation-hook)
    - [`Trans` component usage with components array](https://react.i18next.com/latest/trans-component#alternative-usage-components-array)
  - [i18n-ally VS Code extension](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)

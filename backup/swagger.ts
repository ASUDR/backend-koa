// router.js
// import Router from 'koa-router'

import './test'
import path from 'path';
import { SwaggerRouter } from 'koa-swagger-decorator'

const router = new SwaggerRouter()

router.swagger({
  title: 'Example Server',
  description: 'API DOC',
  version: '1.0.0',

  prefix: '/api',

  swaggerHtmlEndpoint: '/swagger-html',

  swaggerJsonEndpoint: '/swagger-json',

  swaggerOptions: {
    securityDefinitions: {
      api_key: {
        type: 'apiKey',
        in: 'header',
        name: 'api_key',
      },
    },
  },
  swaggerConfiguration: {
    display: {
      defaultModelsExpandDepth: 4,
      defaultModelExpandDepth: 3,
      docExpansion: 'list',
      defaultModelRendering: 'model'
    }
  }
})

router.mapDir(path.resolve(__dirname), {})
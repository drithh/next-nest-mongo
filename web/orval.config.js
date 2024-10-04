import { defineConfig } from 'orval';

/** @type {defineConfig} */
module.exports = defineConfig({
  api: {
    input: `${process.env.API_URL}/swagger-yaml`,
    output: {
      mode: 'tags-split',
      target: 'generated/api.ts',
      schemas: 'generated/schemas',
      client: 'react-query',
      prettier: true,
      override: {
        query: {
          useSuspenseQuery: true,
        },
      },
      baseUrl: process.env.API_URL,
    },
  },
  apiZod: {
    input: `${process.env.API_URL}/swagger-yaml`,
    output: {
      mode: 'single',
      client: 'zod',
      target: 'generated/zod',
      fileExtension: '.zod.ts',
      override: {
        zod: {
          generate: {
            header: true,
            body: true,
            query: true,
            param: true,
            response: true,
          },
          coerce: {
            query: true,
          },
        },
      },
    },
  },
});

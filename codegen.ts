import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const version = process.env.SHOPIFY_API_VERSION ?? "2026-07";

const config: CodegenConfig = {
  schema: [
    {
      [`https://${domain}/api/${version}/graphql.json`]: {
        headers: { "X-Shopify-Storefront-Access-Token": token ?? "" },
      },
    },
  ],
  documents: ["src/lib/shopify/queries/**/*.graphql"],
  generates: {
    "src/lib/shopify/generated/": {
      preset: "client",
      presetConfig: { fragmentMasking: false },
      config: { scalars: { URL: "string", Decimal: "string" } },
    },
  },
  ignoreNoDocuments: true,
};

export default config;

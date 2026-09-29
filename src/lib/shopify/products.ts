import "server-only";
import { print } from "graphql";
import { shopifyFetch } from "./client";
import { ProductsDocument, type ProductsQuery } from "./generated/graphql";

export const PRODUCTS_TAG = "products";

export type Product = ProductsQuery["products"]["nodes"][number];

/** Pobiera listę produktów; cache jest unieważniany przez tag `products`. */
export async function getProducts(first = 12): Promise<Product[]> {
  const data = await shopifyFetch<ProductsQuery>({
    query: print(ProductsDocument),
    variables: { first },
    tags: [PRODUCTS_TAG],
  });
  return data.products.nodes;
}

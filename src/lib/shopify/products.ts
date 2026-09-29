import "server-only";
import { print } from "graphql";
import { shopifyFetch } from "./client";
import {
  ProductDocument,
  ProductsDocument,
  type ProductQuery,
  type ProductsQuery,
} from "./generated/graphql";

export const PRODUCTS_TAG = "products";

export type ProductSummary = ProductsQuery["products"]["nodes"][number];
export type ProductDetails = NonNullable<ProductQuery["product"]>;

/** Pobiera listę produktów; cache jest unieważniany przez tag `products`. */
export async function getProducts(first = 12): Promise<ProductSummary[]> {
  const data = await shopifyFetch<ProductsQuery>({
    query: print(ProductsDocument),
    variables: { first },
    tags: [PRODUCTS_TAG],
  });
  return data.products.nodes;
}

/** Pobiera jeden produkt po `handle`; zwraca null, gdy nie istnieje. */
export async function getProduct(handle: string): Promise<ProductDetails | null> {
  const data = await shopifyFetch<ProductQuery>({
    query: print(ProductDocument),
    variables: { handle },
    tags: [PRODUCTS_TAG, `product:${handle}`],
  });
  return data.product ?? null;
}

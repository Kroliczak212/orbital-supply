import "server-only";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const version = process.env.SHOPIFY_API_VERSION ?? "2026-07";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

/**
 * Wysyła zapytanie do Storefront API. Działa tylko po stronie serwera,
 * więc token nigdy nie trafia do przeglądarki. `tags` pozwalają unieważniać
 * cache przez revalidateTag (ISR).
 */
export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  revalidate = 60,
}: {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Brak SHOPIFY_STORE_DOMAIN lub SHOPIFY_STOREFRONT_ACCESS_TOKEN (patrz .env.example).",
    );
  }

  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate, tags },
  });

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify zwrócił pustą odpowiedź.");
  }
  return json.data;
}

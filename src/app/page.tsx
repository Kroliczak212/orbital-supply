import Image from "next/image";
import { getProducts } from "@/lib/shopify/products";

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency }).format(
    Number(amount),
  );
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-6xl p-8">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">
        Orbital Supply
      </h1>
      {products.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">Brak produktów.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id} className="flex flex-col gap-3">
              {product.featuredImage && (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText ?? product.title}
                  width={product.featuredImage.width ?? 600}
                  height={product.featuredImage.height ?? 600}
                  className="aspect-square w-full rounded-lg object-cover"
                />
              )}
              <h2 className="text-lg font-medium">{product.title}</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                {formatPrice(
                  product.priceRange.minVariantPrice.amount,
                  product.priceRange.minVariantPrice.currencyCode,
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

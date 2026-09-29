import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/shopify/products";
import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button-link";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,#1b2440_0%,#000_60%)]"
        />
        <h1 className="text-4xl font-medium uppercase tracking-[0.3em] sm:text-6xl">
          Orbital Supply
        </h1>
        <p className="mt-6 max-w-md text-sm uppercase tracking-[0.25em] text-muted">
          Wyposażenie na kolejne misje
        </p>
        <ButtonLink href="#sklep" className="mt-12">
          Zobacz sklep
        </ButtonLink>
      </section>

      <section id="sklep" className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10">
        <h2 className="mb-12 text-xs font-medium uppercase tracking-[0.3em] text-muted">
          Sklep
        </h2>
        {products.length === 0 ? (
          <p className="text-muted">Brak produktów.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.handle}`} className="group flex flex-col gap-4">
                  <div className="aspect-square overflow-hidden bg-white/5">
                    {product.featuredImage && (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText ?? product.title}
                        width={product.featuredImage.width ?? 600}
                        height={product.featuredImage.height ?? 600}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-sm font-medium uppercase tracking-[0.15em]">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted">
                      {formatPrice(
                        product.priceRange.minVariantPrice.amount,
                        product.priceRange.minVariantPrice.currencyCode,
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

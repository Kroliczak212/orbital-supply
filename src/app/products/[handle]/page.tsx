import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify/products";
import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button-link";

export async function generateStaticParams() {
  const products = await getProducts(50);
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const images = product.images.nodes;
  const variants = product.variants.nodes;
  const first = variants[0];

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-24 pt-28 sm:px-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-4">
        {images.map((image, i) => (
          <Image
            key={image.url}
            src={image.url}
            alt={image.altText ?? product.title}
            width={image.width ?? 1000}
            height={image.height ?? 1000}
            priority={i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full bg-white/5 object-cover"
          />
        ))}
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <h1 className="text-3xl font-medium uppercase tracking-[0.15em] sm:text-4xl">
          {product.title}
        </h1>
        {first && (
          <p className="mt-4 text-lg text-muted">
            {formatPrice(first.price.amount, first.price.currencyCode)}
          </p>
        )}
        <p className="mt-8 max-w-prose whitespace-pre-line leading-7 text-muted">
          {product.description}
        </p>

        {variants.length > 1 && (
          <ul className="mt-8 flex flex-wrap gap-3" aria-label="Warianty">
            {variants.map((v) => (
              <li
                key={v.id}
                className={`border border-line px-4 py-2 text-xs uppercase tracking-[0.2em] ${
                  v.availableForSale ? "" : "text-muted line-through"
                }`}
              >
                {v.title}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-muted">
          {product.availableForSale ? "Dostępny" : "Niedostępny"}
        </p>

        <ButtonLink href="/#sklep" className="mt-10">
          Wróć do sklepu
        </ButtonLink>
      </div>
    </main>
  );
}

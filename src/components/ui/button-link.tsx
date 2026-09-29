import Link from "next/link";
import type { ComponentProps } from "react";

/** Przycisk-link w stylu SpaceX: cienki obrys, wersaliki, szeroki rozstaw liter. */
export function ButtonLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`inline-flex items-center justify-center border border-foreground px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] transition-colors hover:bg-foreground hover:text-background ${className}`}
      {...props}
    />
  );
}

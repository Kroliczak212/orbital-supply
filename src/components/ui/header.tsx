import Link from "next/link";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference sm:px-10">
      <Link
        href="/"
        className="text-sm font-semibold uppercase tracking-[0.3em]"
      >
        Orbital Supply
      </Link>
      <nav aria-label="Główna nawigacja">
        <ul className="flex items-center gap-8 text-xs font-medium uppercase tracking-[0.2em]">
          <li>
            <Link href="/#sklep" className="hover:opacity-70">
              Sklep
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

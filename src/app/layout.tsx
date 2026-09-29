import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";

// Barlow: bezpłatny krój w stylu DIN, podobny do tego z SpaceX.
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: { default: "Orbital Supply", template: "%s | Orbital Supply" },
  description: "Kosmiczny sklep internetowy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Przejdź do treści
        </a>
        <Header />
        <div id="main" className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}

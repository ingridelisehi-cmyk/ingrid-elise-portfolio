import type { Metadata } from "next";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ingrid Elise | Portefølje",
  description: "Portefølje for Ingrid Elise Endal Hildre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>
        <RevealObserver />
        <div className="site-shell">
          <header className="site-header">
            <div className="container header-inner">
              <Link href="/" className="brand">
                Ingrid Elise
              </Link>
              <nav className="site-nav" aria-label="Hovednavigasjon">
                <a href="/">Hjem</a>
                <a href="/how-i-think">Hvordan jeg tenker</a>
                <a href="/projects">Prosjekter</a>
                <a href="/about">Om</a>
                <a href="/exploring">Utforsker nå</a>
                <a href="/contact">Kontakt</a>
              </nav>
            </div>
          </header>

          <main>
            <div className="container">{children}</div>
          </main>

          <footer className="site-footer">
            <div className="container">
              <p>© {new Date().getFullYear()} Ingrid Elise. Alle rettigheter forbeholdt.</p>
              <p className="footer-note">Bygget med Next.js og Sanity.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
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
        <div className="site-shell">
          <header className="site-header">
            <div className="container header-inner">
              <Link href="/" className="brand">
                Ingrid Elise
              </Link>
              <nav className="site-nav" aria-label="Hovednavigasjon">
                <Link href="/">Hjem</Link>
                <Link href="/how-i-think">Hvordan jeg tenker</Link>
                <Link href="/projects">Prosjekter</Link>
                <Link href="/about">Om</Link>
                <Link href="/exploring">Utforsker nå</Link>
                <Link href="/contact">Kontakt</Link>
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

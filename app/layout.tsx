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

              <nav className="desktop-nav" aria-label="Hovednavigasjon">
                <Link href="/projects">Work</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </nav>

              <details className="mobile-nav" aria-label="Mobilnavigasjon">
                <summary>Menu</summary>
                <div className="mobile-nav-panel">
                  <Link href="/projects">Work</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                </div>
              </details>
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

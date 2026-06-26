import Link from "next/link";
import { navItems } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Focinhos Felizes">
        <img src="/assets/logo-focinhos-felizes.jpeg" alt="Logomarca Focinhos Felizes" />
        <span>Focinhos Felizes</span>
      </Link>
      <nav className="main-nav" aria-label="Navegação principal">
        {navItems.map((item) =>
          item.external ? (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ) : (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}

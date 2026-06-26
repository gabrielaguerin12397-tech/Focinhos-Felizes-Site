import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <img src="/assets/logo-focinhos-felizes.jpeg" alt="" />
      <span>Focinhos Felizes</span>
      <p>Proteção animal com transparência, responsabilidade e afeto.</p>
      <a className="footer-social" href={site.instagram} target="_blank" rel="noopener noreferrer">
        Instagram {site.instagramLabel}
      </a>
    </footer>
  );
}

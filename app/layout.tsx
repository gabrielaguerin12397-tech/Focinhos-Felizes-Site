import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Assistant } from "@/components/assistant";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Adoção de cães e gatos em Manaus | Focinhos Felizes",
    template: "%s | Focinhos Felizes"
  },
  description: "ONG animal em Manaus com adoção responsável de cães e gatos, doações para animais resgatados, apadrinhamento e campanhas de proteção animal.",
  icons: {
    icon: "/icon.jpeg",
    apple: "/apple-icon.jpeg"
  },
  openGraph: {
    title: "Focinhos Felizes",
    description: "Adoção de cães e gatos em Manaus, doações para animais resgatados e apoio à causa animal.",
    url: site.url,
    siteName: site.name,
    images: ["/assets/caramel-dog.png"],
    locale: "pt_BR",
    type: "website"
  },
  alternates: {
    canonical: site.url
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "AnimalShelter",
    name: site.name,
    url: site.url,
    logo: `${site.url}/assets/logo-focinhos-felizes.jpeg`,
    email: site.email,
    telephone: `+55${site.whatsapp}`,
    sameAs: [site.instagram],
    areaServed: "Manaus, AM",
    description: "ONG animal em Manaus com adoção de cães e gatos, doações, apadrinhamento e proteção animal."
  };

  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
        <Assistant />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}

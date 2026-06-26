import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Assistant } from "@/components/assistant";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Focinhos Felizes | Adoção e proteção animal",
    template: "%s | Focinhos Felizes"
  },
  description: "ONG Focinhos Felizes: adoção responsável, doações, apadrinhamento e transparência.",
  openGraph: {
    title: "Focinhos Felizes",
    description: "Eles não precisam de pena. Precisam de uma chance.",
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
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
        <Assistant />
      </body>
    </html>
  );
}

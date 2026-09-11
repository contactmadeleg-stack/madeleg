import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Sans, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisiteTracker from "@/components/VisiteTracker";
import "./globals.css";

// Polices du design system auto-hébergées via next/font (build-time) plutôt
// qu'un <link> vers fonts.googleapis.com au runtime : pas de FOUC, pas de
// requête tierce (RGPD — évite d'envoyer l'IP du visiteur à Google à chaque
// chargement), et ça continue de fonctionner même quand le CDN Google Fonts
// est injoignable au runtime. Les variables générées sont branchées sur les
// tokens --font-display/--font-sans/--font-mono dans globals.css.
const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display-loaded",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madeleg | Économisez sur votre assurance de prêt immobilier",
  description:
    "Simulez en 30 secondes votre économie en changeant d'assurance emprunteur, sans quitter votre banque pour le prêt. Simulation gratuite et sans engagement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`h-full antialiased ${schibstedGrotesk.variable} ${instrumentSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <VisiteTracker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

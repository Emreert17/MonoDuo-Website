import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/ui/MotionProvider";
import { brand, site } from "@/lib/site";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: brand.ogImage, width: 1024, height: 1024, alt: "MonoDuo" }],
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
    images: [brand.ogImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f3ef",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="overflow-x-clip">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

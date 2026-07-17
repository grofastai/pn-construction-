import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PN Construction Builders — Krishnagiri",
  description:
    "PN Construction Builders designs and builds modern homes in Krishnagiri, Tamil Nadu — from first consultation to final handover.",
  keywords: [
    "PN Construction Builders",
    "home construction Krishnagiri",
    "residential builders Tamil Nadu",
    "custom home design",
    "house construction company",
  ],
  authors: [{ name: "PN Construction Builders" }],
  openGraph: {
    title: "PN Construction Builders — Krishnagiri",
    description:
      "Modern homes, built with quality craftsmanship. PN Construction Builders, Krishnagiri.",
    type: "website",
    locale: "en_IN",
    siteName: "PN Construction Builders",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

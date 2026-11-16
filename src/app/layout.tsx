import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RV Makeovers — Salon & Academy | Nabha, Punjab",
  description:
    "Where Beauty Becomes Art. Premium beauty salon, professional makeup studio & beauty training academy in Nabha, Punjab. Founded by Simran — Professional Makeup Artist & Educator.",
  keywords:
    "beauty salon, bridal makeup, makeup academy, Nabha, Punjab, RV Makeovers, Simran, professional makeup, hair styling, skin treatments, nail art",
  openGraph: {
    title: "RV Makeovers — Where Beauty Becomes Art",
    description:
      "Premium beauty salon & academy in Nabha, Punjab. Luxury bridal makeup, professional beauty services & career-building education.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full w-full flex flex-col grain-overlay overflow-x-hidden">{children}</body>
    </html>
  );
}

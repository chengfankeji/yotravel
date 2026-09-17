import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YoTravel | Travel China Like a Local",
  description:
    "YoTravel is a digital travel assistant for foreign tourists in China, covering payments, trains, translations, and concierge support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

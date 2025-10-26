import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prigela Management",
  description: "Material and supplier management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "React Avanzado Demo",
  description: "Mini proyecto para presentar composición, performance y Server Components con Next.js App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}

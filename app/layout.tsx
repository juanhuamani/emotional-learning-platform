import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const _poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "EmoLearn - Plataforma Y2K",
  description: "Plataforma de retroalimentación emocional con estilo Y2K",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {/* Scripts de Morphcast */}
        <Script
          src="https://sdk.morphcast.com/mphtools/v1.1/mphtools.js"
          data-config="cameraPrivacyPopup, compatibilityUI, compatibilityAutoCheck"
          strategy="beforeInteractive"
        />
        <Script
          src="https://ai-sdk.morphcast.com/v1.16/ai-sdk.js"
          strategy="beforeInteractive"
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}

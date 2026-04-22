import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// SEO 메타데이터 설정
export const metadata: Metadata = {
  title: {
    default: "Conversor de Nombres Latino a Coreano",
    template: "%s | Conversor Coreano"
  },
  description: "Convierte tu nombre latino a coreano con la pronunciación exacta. Ideal para fans de K-culture y español hablantes.",
  keywords: ["nombre coreano", "traductor coreano", "pronunciación coreana", "nombres en coreano", "aprender coreano"],
  authors: [{ name: "Suhun Kang" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Conversor de Nombres Latino a Coreano",
    description: "Descubre cómo se escribe과 se pronuncia tu nombre en coreano.",
    url: "https://nombre-coreano.vercel.app", // 실제 배포 주소로 변경하세요
    siteName: "Conversor de Nombres",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* SEO를 위해 언어를 es로 설정 */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='10908489',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='10908490',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
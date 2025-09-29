import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import Link from "next/link";
import CookieConsentComponent from "@/components/cookie-consent";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import PWAStatus from "@/components/pwa-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Répéter - French Language Learning",
  description:
    "Learn French phrases through repetition and practice. A progressive web app for French language learning.",
  keywords: ["French", "language", "learning", "phrases", "repetition", "PWA"],
  authors: [{ name: "O Wolf", url: "http://owolf.com" }],
  creator: "O Wolf",
  publisher: "O Wolf",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://repeter.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Répéter - French Language Learning",
    description: "Learn French phrases through repetition and practice",
    url: "https://repeter.vercel.app",
    siteName: "Répéter",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Répéter App Icon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Répéter - French Language Learning",
    description: "Learn French phrases through repetition and practice",
    images: ["/icons/icon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Répéter",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#519ef5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#519ef5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Répéter" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
      </head>
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between sm:px-8 p-2 bg-[#519ef5] font-mono text-sm">
          <Navigation />
          {children}
          <footer className="flex flex-col items-center p-8 gap-4">
            <div className=" text-black text-sm flex gap-2 sm:flex-row flex-col items-center">
              <div>Répéter</div> <div>- French language learning app -</div>
              <div>
                <Link target="_blank" href="http://owolf.com">
                  Built by O Wolf
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/">Home</Link> <Link href="/about">About</Link>{" "}
              <Link href="/contact">Contact</Link>{" "}
              <Link href="/privacy">Privacy</Link>
            </div>
            <CookieConsentComponent />
          </footer>
        </main>
        <PWAStatus />
        <PWAInstallPrompt />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

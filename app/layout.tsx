import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import Link from "next/link";
import CookieConsentComponent from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Répéter",
  description: "French phrase repetition app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}

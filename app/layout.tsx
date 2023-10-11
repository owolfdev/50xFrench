import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import Link from "next/link";

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
        <main className="flex min-h-screen flex-col items-center justify-between sm:px-8 p-2 bg-[#f55751] font-mono text-sm">
          <Navigation />
          {children}
          <footer className="p-8 text-black opacity-80 text-sm">
            Répéter - French language learning app -{" "}
            <Link target="_blank" href="http://owolf.com">
              Built by Owolf
            </Link>
          </footer>
        </main>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import ChatBotIcon from "@/components/ChatBotIcon";
import ScrollMotion from "@/components/ScrollMotion";
import LiveChat from "@/components/LiveChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Isaac Koffi – Portfolio",
  description:
    "Portfolio d'Isaac N'Dri Koffi, Développeur Web Full-Stack Junior à Abidjan – PHP/Symfony, React.js, Node.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        {/* Dark by default; apply a saved "light" choice before first paint (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme-choice")==="light")document.documentElement.classList.remove("dark")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <Providers>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <ChatBotIcon />
          <LiveChat />
          <ScrollMotion />
        </Providers>
      </body>
    </html>
  );
}

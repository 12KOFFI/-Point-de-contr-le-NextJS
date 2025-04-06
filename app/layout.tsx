import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mon Portfolio',
  description: 'Portfolio développé avec Next.js, Tailwind CSS, TypeScript et React',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-neutral-950 text-white`}>
        <Header /> {/* Navbar avec les liens de navigation */}
        <main className="pt-20">{children}</main> {/* Marge pour éviter de cacher le contenu sous la navbar fixe */}
        <Footer /> {/* Bas de page avec infos et liens */}
      </body>
    </html>
  );
}

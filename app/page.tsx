// app/page.tsx

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Presentation = dynamic(() => import("@/components/Presentation"));
const DeveloperInfo = dynamic(() => import("@/components/DeveloperInfo"));
const Questions = dynamic(() => import("@/components/Questions"));

export const metadata = {
  title: "Isaac Koffi – Accueil",
  description: "Portfolio de Isaac Koffi, Développeur Web Full-Stack Junior.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Presentation />
      <DeveloperInfo />
      <Questions />
    </>
  );
}

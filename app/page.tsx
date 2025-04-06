// app/page.tsx


import Hero from "@/components/Hero";
import Presentation from "@/components/Presentation";
import DeveloperInfo from "@/components/DeveloperInfo";
import Questions from "@/components/Questions";

export const metadata = {
  title: "Portfolio-Acceuil",
  description: "Page à propos de mon portfolio.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Presentation />
      <DeveloperInfo />
      <Questions />
      

    </main>
  );
}

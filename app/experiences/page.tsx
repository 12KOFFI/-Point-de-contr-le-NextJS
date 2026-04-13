import dynamic from "next/dynamic";

const Experience = dynamic(() => import("@/components/Experience"));

export const metadata = {
  title: "Isaac Koffi – Expériences",
  description:
    "Expériences professionnelles et formation de Isaac Koffi, Développeur Web Full-Stack.",
};

export default function ExperiencesPage() {
  return (
    <main>
      <Experience />
    </main>
  );
}

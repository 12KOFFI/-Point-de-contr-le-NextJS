import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/Projects"));

export const metadata = {
  title: "Isaac Koffi – Projets",
  description: "Projets réalisés par Isaac Koffi, Développeur Web Full-Stack.",
};
export default function AProposPage() {
  return (
    <main>
      <Projects />
    </main>
  );
}

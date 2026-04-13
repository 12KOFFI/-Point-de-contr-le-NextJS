import dynamic from "next/dynamic";

const Presentation = dynamic(() => import("@/components/Presentation"));
const DeveloperInfo = dynamic(() => import("@/components/DeveloperInfo"));

export const metadata = {
  title: "Isaac Koffi – À propos",
  description: "À propos de Isaac Koffi, Développeur Web Full-Stack.",
};
export default function AProposPage() {
  return (
    <main>
      <Presentation />
      <DeveloperInfo />
      {/* Ajoutez d'autres composants ou sections ici si nécessaire */}
    </main>
  );
}

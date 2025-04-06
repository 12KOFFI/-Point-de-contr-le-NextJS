import Presentation from '@/components/Presentation';
import DeveloperInfo from "@/components/DeveloperInfo";

export const metadata = {
  title: "Portfolio-Apropos",
  description: "Page à propos de mon portfolio.",
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

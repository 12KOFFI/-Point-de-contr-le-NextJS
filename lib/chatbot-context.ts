import { translations, Language } from "./translations";

/**
 * Build a structured text context from all portfolio data
 * so the AI can answer any recruiter question accurately.
 */
export function buildPortfolioContext(lang: Language): string {
  const t = translations[lang];

  const sections: string[] = [];

  // ── Identity ──
  sections.push(`# ${t.hero.name} – ${t.hero.role}
${t.hero.description}
${t.contact.locationValue}`);

  // ── About / Developer info ──
  sections.push(`# ${lang === "fr" ? "À propos" : "About"}
${t.developerInfo.texts.join("\n")}`);

  // ── Skills ──
  sections.push(`# ${t.presentation.title}
- ${t.presentation.backend}: PHP 8, Symfony, Doctrine ORM, Twig, Node.js, Express.js, REST API, JWT, DomPDF, MVC
- ${t.presentation.frontend}: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap 5 — ${lang === "fr" ? "notions de" : "basics of"} Next.js, Tailwind CSS
- ${t.presentation.database}: MySQL, MongoDB · Git, GitHub, Postman, VS Code, Vercel, Render, o2switch, Cloudinary
- ${lang === "fr" ? "Méthode : Agile" : "Method: Agile"}
- ${lang === "fr" ? "Langues : français (langue maternelle), anglais élémentaire (A2, lecture de documentation technique)" : "Languages: French (native), basic English (A2, reading technical documentation)"}`);

  // ── Professional Experience ──
  const exp = t.experiences;
  sections.push(`# ${exp.experienceTitle}

## ${exp.intern.role}
${exp.intern.company} | ${exp.intern.period}
${exp.intern.tasks.map((task) => `- ${task}`).join("\n")}
Stack: ${exp.intern.stack}

## ${exp.freelance.role}
${exp.freelance.company} | ${exp.freelance.period}
${exp.freelance.tasks.map((task) => `- ${task}`).join("\n")}
Stack: ${exp.freelance.stack}
${exp.freelance.note}`);

  // ── Education ──
  sections.push(`# ${exp.educationTitle}
${exp.education.map((e) => `- ${e.title} – ${e.school} (${e.period})`).join("\n")}

## ${exp.certificationsTab}
${exp.certifications.map((c) => `- ${c.title} – ${c.school} (${c.period})${"link" in c ? ` – ${c.link}` : ""}`).join("\n")}`);

  // ── Projects ──
  const p = t.projects;
  const projectList = [
    p.daip,
    p.daikin,
    p.multiNettoyage,
    p.ecommerce,
    p.etatCivil,
    p.blog,
    p.taskManager,
  ];
  sections.push(`# ${p.title} ${p.titleHighlight}
${projectList.map((proj) => `## ${proj.title}\n${proj.description}`).join("\n\n")}`);

  // ── Why work with me ──
  sections.push(`# ${t.questions.title}
${t.questions.items.map((q) => `- ${q.title}: ${q.desc}`).join("\n")}`);

  // ── Contact ──
  sections.push(`# Contact
- ${t.contact.email}: isaacndri5@gmail.com
- ${t.contact.location}: ${t.contact.locationValue}
- ${t.contact.github}: github.com/12KOFFI
- ${t.contact.linkedin}: linkedin.com/in/isaac-n-dri-koffi-7b74b4247`);

  return sections.join("\n\n---\n\n");
}

/**
 * System prompt that defines the chatbot personality
 */
export function getSystemPrompt(lang: Language): string {
  const context = buildPortfolioContext(lang);

  if (lang === "fr") {
    return `Tu es l'assistant IA du portfolio d'Isaac Koffi, développeur web full-stack.

RÔLE : Tu réponds aux questions des recruteurs et visiteurs comme si tu étais Isaac lui-même — de manière professionnelle, confiante et naturelle.

RÈGLES :
- Réponds UNIQUEMENT à partir des données du portfolio ci-dessous.
- Si une question sort du contexte du portfolio, redirige poliment vers les informations disponibles.
- Sois concis mais complet. Utilise des listes quand c'est pertinent.
- Ton : professionnel, confiant, accessible. Pas de formalisme excessif.
- Termine tes réponses par une invitation à en savoir plus ou à prendre contact quand c'est pertinent.
- Réponds toujours en français.

DONNÉES DU PORTFOLIO :
${context}`;
  }

  return `You are the AI assistant for Isaac Koffi's portfolio, a full-stack web developer.

ROLE: You answer questions from recruiters and visitors as if you were Isaac himself — professional, confident and natural.

RULES:
- Answer ONLY based on the portfolio data below.
- If a question is outside the portfolio context, politely redirect to available information.
- Be concise but thorough. Use bullet lists when relevant.
- Tone: professional, confident, approachable. No excessive formality.
- End responses with an invitation to learn more or get in touch when appropriate.
- Always respond in English.

PORTFOLIO DATA:
${context}`;
}

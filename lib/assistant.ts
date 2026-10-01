/**
 * Site assistant — rule-based, no AI, no server, no API key.
 *
 * Answers come from the same data as the pages (translations + lib/site), so they
 * stay true and in sync with the CV. Free text is matched by keywords (FR + EN,
 * accent-insensitive); anything not understood turns into a ready-to-send email.
 */
import { translations, type Language } from "@/lib/translations";
import { CONTACT, PROJECT_LINKS, type ProjectKey } from "@/lib/site";

export type TopicId =
  | "profile"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "availability"
  | "contact"
  | "cv";

/** `live: true` opens the live chat (Tawk.to) instead of following a link */
export type Action = { label: string; href: string; external?: boolean; download?: boolean; live?: boolean };

const liveAction = (lang: Language): Action => ({
  label: lang === "fr" ? "Discuter en direct" : "Chat live",
  href: "#live-chat",
  live: true,
});

export type Reply = {
  text: string;
  actions?: Action[];
  /** topics suggested as next questions */
  next?: TopicId[];
};

/* ------------------------------------------------------------------ copy */

export const UI = {
  fr: {
    title: "Assistant d'Isaac",
    subtitle: "Réponses instantanées sur mon parcours",
    placeholder: "Posez votre question…",
    send: "Envoyer",
    close: "Fermer l'assistant",
    topicsLabel: "Sujets",
    restart: "Recommencer",
    typing: "Isaac écrit…",
    note: "Assistant automatique — pour une vraie discussion, écrivez-moi.",
    live: {
      online: "Isaac est en ligne",
      away: "Isaac est absent",
      offline: "Isaac est hors ligne",
      loading: "Chat en direct",
      ctaOnline: "Discuter en direct",
      ctaOffline: "Laisser un message",
      resume: "Reprendre la conversation",
      unread: (n: number) => (n > 1 ? `${n} nouveaux messages` : "1 nouveau message"),
    },
    topics: {
      profile: "Profil",
      skills: "Compétences",
      experience: "Expériences",
      projects: "Projets",
      education: "Formation",
      availability: "Disponibilité",
      contact: "Contact",
      cv: "CV",
    } satisfies Record<TopicId, string>,
  },
  en: {
    title: "Isaac's assistant",
    subtitle: "Instant answers about my background",
    placeholder: "Ask your question…",
    send: "Send",
    close: "Close the assistant",
    topicsLabel: "Topics",
    restart: "Start over",
    typing: "Isaac is typing…",
    note: "Automated assistant — for a real conversation, email me.",
    live: {
      online: "Isaac is online",
      away: "Isaac is away",
      offline: "Isaac is offline",
      loading: "Live chat",
      ctaOnline: "Chat live",
      ctaOffline: "Leave a message",
      resume: "Resume the conversation",
      unread: (n: number) => (n > 1 ? `${n} new messages` : "1 new message"),
    },
    topics: {
      profile: "Profile",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      availability: "Availability",
      contact: "Contact",
      cv: "Resume",
    } satisfies Record<TopicId, string>,
  },
} as const;

export const TOPIC_ORDER: TopicId[] = [
  "profile",
  "skills",
  "projects",
  "experience",
  "education",
  "availability",
  "contact",
  "cv",
];

/* ------------------------------------------------------------- matching */

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// keywords are matched as substrings of the normalized question
const TOPIC_KEYWORDS: Record<TopicId, string[]> = {
  profile: ["qui es", "qui est", "presente", "profil", "parle moi de toi", "a propos", "about you", "who are", "who is", "introduce", "yourself", "toi meme"],
  skills: ["competence", "stack", "techno", "technolog", "langage", "outil", "maitrise", "savoir faire", "base de donnee", "bases de donnee", "bdd", "sgbd", "database", "skill", "tool", "framework", "language", "tech"],
  experience: ["experience", "stage", "stagiaire", "freelance", "daip", "travaille", "emploi precedent", "entreprise", "mission", "internship", "worked", "work history", "work experience", "company"],
  projects: ["projet", "realisation", "portfolio", "application", "site web", "1jeune1metier", "1 jeune 1 metier", "daikin", "devis", "nettoyage", "ecommerce", "e-commerce", "boutique", "etat civil", "blog", "tache", "project", "built", "app"],
  education: ["formation", "diplome", "etude", "licence", "bts", "ecole", "universite", "certif", "coursera", "gomycode", "bootcamp", "cqp", "education", "degree", "school", "study", "certificate"],
  availability: ["disponib", "recrut", "embauch", "poste", "cdi", "cdd", "opportunit", "chercher", "cherche", "recherche", "remote", "teletravail", "distance", "salaire", "hire", "hiring", "available", "availability", "job", "looking for", "position", "open to", "freelance mission"],
  contact: ["contact", "email", "e-mail", "mail", "telephone", "numero", "appeler", "joindre", "linkedin", "github", "reseau", "phone", "call", "reach", "number"],
  cv: ["cv", "resume", "curriculum", "telecharger", "download"],
};

const SMALL_TALK = {
  greeting: ["bonjour", "salut", "bonsoir", "hello", "hi", "hey", "coucou"],
  thanks: ["merci", "thanks", "thank you", "super", "parfait", "genial", "cool", "great"],
  location: ["ou es", "ou habites", "ou vis", "ville", "pays", "base a", "basee", "abidjan", "cote d ivoire", "where", "location", "based", "country", "city"],
  languages: ["anglais", "francais", "langue", "parles", "english", "french", "speak"],
};

type Tech = { name: string; aliases: string[]; level: "core" | "basics"; cat: "frontend" | "backend" | "database" | "tools" };

// From the CV: core skills vs "notions"
const TECHS: Tech[] = [
  { name: "PHP 8", aliases: ["php"], level: "core", cat: "backend" },
  { name: "Symfony", aliases: ["symfony"], level: "core", cat: "backend" },
  { name: "Doctrine ORM", aliases: ["doctrine"], level: "core", cat: "backend" },
  { name: "Twig", aliases: ["twig"], level: "core", cat: "backend" },
  { name: "Node.js", aliases: ["node", "nodejs"], level: "core", cat: "backend" },
  { name: "Express.js", aliases: ["express"], level: "core", cat: "backend" },
  { name: "API REST / JWT", aliases: ["api", "rest", "jwt"], level: "core", cat: "backend" },
  { name: "React.js", aliases: ["react", "reactjs"], level: "core", cat: "frontend" },
  { name: "JavaScript (ES6+)", aliases: ["javascript", "es6"], level: "core", cat: "frontend" },
  { name: "HTML5 / CSS3", aliases: ["html", "css"], level: "core", cat: "frontend" },
  { name: "Bootstrap 5", aliases: ["bootstrap"], level: "core", cat: "frontend" },
  { name: "Next.js", aliases: ["nextjs", "next.js"], level: "basics", cat: "frontend" },
  { name: "Tailwind CSS", aliases: ["tailwind"], level: "basics", cat: "frontend" },
  { name: "MySQL", aliases: ["mysql", "sql"], level: "core", cat: "database" },
  { name: "MongoDB", aliases: ["mongo", "mongodb"], level: "core", cat: "database" },
  { name: "Git / GitHub", aliases: ["git"], level: "core", cat: "tools" },
  { name: "Postman", aliases: ["postman"], level: "core", cat: "tools" },
  { name: "Vercel / Render / o2switch", aliases: ["vercel", "render", "o2switch", "deploi", "deploy", "heberg"], level: "core", cat: "tools" },
];

// Common technologies that are honestly *not* in the stack
const NOT_IN_STACK = ["python", "django", "java", "spring", "c#", "laravel", "angular", "vuejs", "vue.js", "svelte", "flutter", "kotlin", "swift", "golang", "rust", "docker", "kubernetes", "aws", "azure", "wordpress", "ruby"];

// keywords are prefixes of words ("competence" matches "competences"); a keyword
// with spaces matches across words. Whole-word start avoids "git" in "digital".
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const hasWord = (q: string, w: string) =>
  new RegExp(`(^|[^a-z0-9])${escape(w.trim())}`).test(q);
const hasExact = (q: string, w: string) =>
  new RegExp(`(^|[^a-z0-9])${escape(w.trim())}($|[^a-z0-9])`).test(q);
const hasAny = (q: string, words: string[]) => words.some((w) => hasWord(q, w));

const PROJECT_HINTS: [ProjectKey, string[]][] = [
  ["daip", ["1jeune1metier", "1 jeune 1 metier", "jeune metier", "plateforme nationale"]],
  ["daikin", ["daikin"]],
  ["multiNettoyage", ["devis", "nettoyage", "multi-nettoyage", "multi nettoyage", "quote"]],
  ["ecommerce", ["ecommerce", "e-commerce", "boutique", "shop", "store", "techmarket"]],
  ["etatCivil", ["etat civil", "civil"]],
  ["blog", ["blog"]],
  ["taskManager", ["tache", "task", "todo"]],
];

/* --------------------------------------------------------------- replies */

export function welcome(lang: Language): Reply {
  return lang === "fr"
    ? {
        text: "Bonjour 👋 Je suis l'assistant du portfolio d'Isaac. Choisissez un sujet ou posez votre question : compétences, projets, disponibilité, contact…",
        next: TOPIC_ORDER,
      }
    : {
        text: "Hi 👋 I'm the assistant of Isaac's portfolio. Pick a topic or ask your question: skills, projects, availability, contact…",
        next: TOPIC_ORDER,
      };
}

const fr = (lang: Language) => lang === "fr";

function contactActions(lang: Language): Action[] {
  return [
    liveAction(lang),
    { label: fr(lang) ? "Envoyer un email" : "Send an email", href: `mailto:${CONTACT.email}` },
    { label: "LinkedIn", href: CONTACT.linkedin, external: true },
    { label: fr(lang) ? "Télécharger le CV" : "Download resume", href: CONTACT.cv, download: true },
  ];
}

export function topicReply(topic: TopicId, lang: Language): Reply {
  const t = translations[lang];
  const ex = t.experiences;
  const F = fr(lang);

  switch (topic) {
    case "profile":
      return {
        text: `${t.hero.name} — ${t.hero.role}, ${t.contact.locationValue}.\n\n${t.hero.description}`,
        actions: [{ label: F ? "Voir la page À propos" : "Open the About page", href: "/apropos" }],
        next: ["skills", "projects", "availability"],
      };

    case "skills": {
      const list = (cat: Tech["cat"], level: Tech["level"]) =>
        TECHS.filter((x) => x.cat === cat && x.level === level).map((x) => x.name).join(", ");
      return {
        text: F
          ? `Backend : ${list("backend", "core")}.\nFrontend : ${list("frontend", "core")} — notions de ${list("frontend", "basics")}.\nBases de données : ${list("database", "core")}.\nOutils : ${list("tools", "core")}.\n\nVous pouvez aussi me demander une techno précise, ex. « tu fais du React ? ».`
          : `Backend: ${list("backend", "core")}.\nFrontend: ${list("frontend", "core")} — basics of ${list("frontend", "basics")}.\nDatabases: ${list("database", "core")}.\nTools: ${list("tools", "core")}.\n\nYou can also ask about a specific tech, e.g. “do you use React?”.`,
        next: ["projects", "experience", "education"],
      };
    }

    case "experience":
      return {
        text: [ex.intern, ex.freelance]
          .map((e) => `• ${e.role} — ${e.company} (${e.period})\n  ${e.tasks[0]}.`)
          .join("\n\n"),
        actions: [{ label: F ? "Voir le parcours complet" : "See full experience", href: "/experiences" }],
        next: ["projects", "skills", "availability"],
      };

    case "projects": {
      const keys: ProjectKey[] = ["daip", "daikin", "multiNettoyage", "ecommerce"];
      return {
        text:
          (F ? "Projets principaux :\n" : "Main projects:\n") +
          keys.map((k) => `• ${t.projects[k].title}`).join("\n") +
          (F
            ? "\n\nNommez-en un pour en savoir plus (ex. « Daikin », « devis »)."
            : "\n\nName one to learn more (e.g. “Daikin”, “quote app”)."),
        actions: [{ label: F ? "Voir tous les projets" : "See all projects", href: "/projets" }],
        next: ["skills", "experience", "contact"],
      };
    }

    case "education":
      return {
        text:
          (F ? "Formation :\n" : "Education:\n") +
          ex.education.map((e) => `• ${e.title} — ${e.school} (${e.period})`).join("\n") +
          (F ? "\n\nCertifications :\n" : "\n\nCertifications:\n") +
          ex.certifications.map((c) => `• ${c.title} — ${c.school} (${c.period})`).join("\n"),
        actions: [{ label: F ? "Voir les certificats" : "See certificates", href: "/experiences#certifications" }],
        next: ["skills", "experience", "availability"],
      };

    case "availability":
      return {
        text: F
          ? `Je recherche un poste de développeur web ou full-stack junior. Basé à ${t.contact.locationValue}, j'ai déjà travaillé à distance pour un client en France (Multi-Nettoyage 94).\n\nLe plus simple pour en discuter : un email ou LinkedIn.`
          : `I'm looking for a junior web or full-stack developer position. Based in ${t.contact.locationValue}, I've already worked remotely for a client in France (Multi-Nettoyage 94).\n\nThe easiest way to talk: email or LinkedIn.`,
        actions: contactActions(lang),
        next: ["skills", "projects", "cv"],
      };

    case "contact":
      return {
        text: F
          ? `• Email : ${CONTACT.email}\n• Téléphone : ${CONTACT.phoneLabel}\n• LinkedIn et GitHub : boutons ci-dessous.`
          : `• Email: ${CONTACT.email}\n• Phone: ${CONTACT.phoneLabel}\n• LinkedIn and GitHub: buttons below.`,
        actions: [
          liveAction(lang),
          { label: F ? "Envoyer un email" : "Send an email", href: `mailto:${CONTACT.email}` },
          { label: F ? "Appeler" : "Call", href: CONTACT.phoneHref },
          { label: "LinkedIn", href: CONTACT.linkedin, external: true },
          { label: "GitHub", href: CONTACT.github, external: true },
        ],
        next: ["availability", "cv"],
      };

    case "cv":
      return {
        text: F ? "Voici mon CV à jour (PDF)." : "Here is my up-to-date resume (PDF).",
        actions: [
          { label: F ? "Télécharger le CV" : "Download resume", href: CONTACT.cv, download: true },
          { label: F ? "Envoyer un email" : "Send an email", href: `mailto:${CONTACT.email}` },
        ],
        next: ["availability", "contact"],
      };
  }
}

function projectReply(key: ProjectKey, lang: Language): Reply {
  const p = translations[lang].projects[key];
  const links = PROJECT_LINKS[key];
  const actions: Action[] = [];
  if (links.link) actions.push({ label: fr(lang) ? "Voir le site" : "Visit site", href: links.link, external: true });
  if (links.github) actions.push({ label: fr(lang) ? "Code source" : "Source code", href: links.github, external: true });
  return { text: `${p.title}\n\n${p.description}`, actions, next: ["projects", "skills", "contact"] };
}

function techReply(q: string, lang: Language): Reply | null {
  const F = fr(lang);
  const found = TECHS.filter((x) => x.aliases.some((a) => hasExact(q, a)));
  const missing = NOT_IN_STACK.filter((w) => hasExact(q, w));
  if (!found.length && !missing.length) return null;

  const lines: string[] = [];
  for (const x of found) {
    lines.push(
      x.level === "core"
        ? F
          ? `✅ ${x.name} : oui, ça fait partie de ma stack principale.`
          : `✅ ${x.name}: yes, part of my core stack.`
        : F
          ? `🟡 ${x.name} : j'en ai des notions (utilisé sur des projets personnels, dont ce portfolio).`
          : `🟡 ${x.name}: I have working basics (used on personal projects, including this portfolio).`,
    );
  }
  for (const w of missing) {
    const name = w.trim().replace(/^./, (c) => c.toUpperCase());
    lines.push(
      F
        ? `➖ ${name} : pas dans ma stack actuelle — mais j'apprends vite (Symfony, React et Node appris en formation et en mission).`
        : `➖ ${name}: not in my current stack — but I learn fast (Symfony, React and Node were learned in training and on the job).`,
    );
  }
  return { text: lines.join("\n"), next: ["skills", "projects"] };
}

/** Answer free text. Returns the reply and whether it was understood. */
export function answer(input: string, lang: Language): Reply & { understood: boolean } {
  const q = normalize(input);
  const F = fr(lang);
  if (!q) return { ...welcome(lang), understood: true };

  // specific project first (most precise)
  for (const [key, hints] of PROJECT_HINTS) {
    if (hasAny(q, hints)) return { ...projectReply(key, lang), understood: true };
  }

  // a technology question ("tu fais du react ?", "python ?")
  const tech = techReply(q, lang);
  if (tech) {
    // "je cherche un dev PHP pour un CDI" → answer the tech *and* the hiring intent
    if (TOPIC_KEYWORDS.availability.some((k) => hasWord(q, k))) {
      const hire = topicReply("availability", lang);
      return { text: `${tech.text}\n\n${hire.text}`, actions: hire.actions, next: hire.next, understood: true };
    }
    return { ...tech, understood: true };
  }

  // topics, scored by keyword hits
  let best: TopicId | null = null;
  let bestScore = 0;
  for (const topic of TOPIC_ORDER) {
    const score = TOPIC_KEYWORDS[topic].filter((k) => hasWord(q, k)).length;
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }
  if (best) return { ...topicReply(best, lang), understood: true };

  if (hasAny(q, SMALL_TALK.location)) {
    const loc = translations[lang].contact.locationValue;
    return {
      text: F
        ? `Je suis basé à ${loc}, ouvert au travail sur site ou à distance.`
        : `I'm based in ${loc}, open to on-site or remote work.`,
      next: ["availability", "contact"],
      understood: true,
    };
  }
  if (hasAny(q, SMALL_TALK.languages)) {
    return {
      text: F
        ? "Français : langue maternelle. Anglais : niveau élémentaire (A2), je lis la documentation technique sans difficulté."
        : "French: native. English: elementary (A2) — I read technical documentation comfortably.",
      next: ["skills", "availability"],
      understood: true,
    };
  }
  if (hasAny(q, SMALL_TALK.thanks)) {
    return {
      text: F ? "Avec plaisir ! Autre chose ?" : "You're welcome! Anything else?",
      next: ["projects", "contact", "cv"],
      understood: true,
    };
  }
  if (hasAny(q, SMALL_TALK.greeting)) return { ...welcome(lang), understood: true };

  // not understood → turn the question into an email
  const subject = encodeURIComponent(F ? "Question depuis votre portfolio" : "Question from your portfolio");
  const body = encodeURIComponent(input);
  return {
    text: F
      ? "Je n'ai pas de réponse toute prête à cette question 🤔 Posez-la à Isaac en direct, envoyez-la par email (elle est déjà rédigée), ou choisissez un sujet."
      : "I don't have a ready answer to that one 🤔 Ask Isaac live, send it by email (already written for you), or pick a topic.",
    actions: [
      liveAction(lang),
      { label: F ? "Envoyer ma question" : "Send my question", href: `mailto:${CONTACT.email}?subject=${subject}&body=${body}` },
    ],
    next: TOPIC_ORDER,
    understood: false,
  };
}

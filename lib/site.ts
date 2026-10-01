// Single source of truth for contact details and project links
// (used by the projects page and the site assistant).

export const CONTACT = {
  email: "isaacndri5@gmail.com",
  phoneLabel: "+225 01 41 38 25 95",
  phoneHref: "tel:+2250141382595",
  linkedin: "https://www.linkedin.com/in/isaac-n-dri-koffi-7b74b4247/",
  github: "https://github.com/12KOFFI",
  cv: "/CV_Isaac_NDri_Koffi_Developpeur.pdf",
};

export const PROJECT_LINKS = {
  daip: { link: "https://1jeune1metier.daip.ci", github: null },
  daikin: { link: "https://daip.ci/daikin/recrutement", github: null },
  multiNettoyage: { link: "https://multi-nettoyage94.fr/", github: null },
  ecommerce: {
    link: "https://ecommerce-finaly.vercel.app/",
    github: "https://github.com/12KOFFI/PROJET-ECOMMERCE",
  },
  etatCivil: { link: null, github: "https://github.com/12KOFFI/etatcivil" },
  blog: { link: null, github: "https://github.com/12KOFFI/MyBlog" },
  taskManager: { link: null, github: "https://github.com/12KOFFI/TODO-APP-FULL-STACK" },
} as const;

export type ProjectKey = keyof typeof PROJECT_LINKS;

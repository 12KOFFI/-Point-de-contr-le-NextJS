export type Language = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      experiences: "Expériences",
      contact: "Contact",
    },
    hero: {
      greeting: "Salut, moi c'est",
      name: "Isaac Koffi",
      role: "Développeur Web Full-Stack Junior",
      description:
        "Plus d'un an d'expérience en stage et en freelance : j'ai contribué à la plateforme nationale 1Jeune1Métier et livré seul une application de gestion de devis pour un client en France.",
      typedPrefix: "Spécialisé en",
      typedRoles: ["PHP / Symfony", "React.js", "Node.js & Express", "API REST"],
      robotLabel:
        "Robot animé qui tourne la tête vers le curseur. Glissez-le pour le déplacer (flèches au clavier, Échap ou double-clic pour le replacer).",
      scrollHint: "Défiler vers les compétences",
      viewProjects: "Voir mes projets",
      downloadCV: "Télécharger CV",
    },
    presentation: {
      title: "Compétences",
      heading: "Stack",
      headingHighlight: "technique",
      hint: "Survolez une bulle pour regrouper la stack, cliquez pour la disperser.",
      hintTouch: "Touchez une bulle pour regrouper la stack autour d'elle.",
      frontend: "Frontend",
      backend: "Backend",
      database: "Bases de données & Outils",
    },
    developerInfo: {
      title: "Développeur Web Full-Stack Junior",
      texts: [
        "Développeur web full-stack junior basé à Abidjan, titulaire d'une Licence en développement d'applications (Université Virtuelle de Côte d'Ivoire).",
        "Plus d'un an d'expérience entre mon stage à la DAIP et mes missions en freelance.",
        "À la DAIP, j'ai développé 3 modules de la plateforme nationale 1Jeune1Métier au sein d'une équipe de 5 développeurs, en méthode Agile.",
        "En freelance, j'ai livré seul une application de gestion de devis pour Multi-Nettoyage 94, une entreprise basée en France — de la conception au déploiement.",
        "Côté backend, je maîtrise PHP/Symfony et MySQL ; côté JavaScript, React.js et Node.js/Express (certificat Software Developer Bootcamp de GOMYCODE).",
        "J'aime aussi transmettre : j'ai formé et accompagné les utilisateurs de 112 établissements, avec des guides et des vidéos d'utilisation.",
        "Je recherche aujourd'hui un poste de développeur web ou full-stack junior.",
        "Un projet ou une opportunité ? Discutons-en.",
      ],
    },
    projects: {
      title: "Mes",
      titleHighlight: "projets",
      viewProject: "Voir le site",
      sourceCode: "Code source",
      otherProjects: "Autres projets",
      screenshotAlt: "Capture d'écran du site",
      daip: {
        title: "Plateforme nationale 1Jeune1Métier – DAIP",
        description:
          "Développement de 3 modules de la plateforme nationale : prospection des postes, équipements et référentiels, planification pédagogique, présences, livret numérique et évaluations. Utilisateurs de 112 établissements formés et accompagnés.",
      },
      daikin: {
        title: "Plateforme de recrutement Daikin – DAIP",
        description:
          "Participation au développement de la plateforme de recrutement du projet DAIKIN (École de la 2e Chance, METFPA) : candidature en ligne, espace candidat avec tableau de bord, publication des résultats d'admission et enquête de suivi post-formation.",
      },
      ecommerce: {
        title: "Application e-commerce full-stack",
        description:
          "Boutique en ligne : catalogue, panier, commandes, gestion des utilisateurs et authentification JWT. API REST testée sous Postman, images gérées via Cloudinary, déploiement sur Vercel et Render.",
      },
      etatCivil: {
        title: "Plateforme d'actes d'état civil",
        description:
          "Interface citoyenne pour les demandes en ligne. Tableau de bord de validation/suppression par l'officier d'état civil. Génération de PDF, statistiques mensuelles.",
      },
      blog: {
        title: "Blog PHP/Symfony",
        description:
          "CRUD complet pour articles et commentaires, gestion rôles admin/visiteur. Authentification, autorisations et sécurité – design responsive Tailwind CSS.",
      },
      taskManager: {
        title: "Gestionnaire de Tâches",
        description:
          "Application intuitive pour créer, modifier et suivre ses tâches quotidiennes.",
      },
      multiNettoyage: {
        title: "Gestion de devis – Multi-Nettoyage 94",
        description:
          "Application de gestion de devis (immeubles, maisons, bureaux) développée seul de A à Z. Devis PDF générés (DomPDF) et envoyés par e-mail en quelques secondes, back-office sécurisé avec rôles et tableau de bord. Déployée sur o2switch.",
      },
    },
    experiences: {
      title: "Mes",
      titleHighlight: "expériences",
      experienceTitle: "Expériences professionnelles",
      educationTitle: "Formation & certifications",
      educationTab: "Formation",
      certificationsTab: "Certifications",
      viewCertificate: "Voir le certificat",
      certificateAlt: "Certificat",
      intern: {
        role: "Développeur PHP/Symfony · Stage",
        company:
          "DAIP, Abidjan – Direction de l'Apprentissage et de l'Insertion Professionnelle",
        period: "Juin 2025 – Juil. 2026",
        tasks: [
          "Développé 3 modules de la plateforme nationale 1Jeune1Métier (1jeune1metier.daip.ci) : prospection des postes, équipements et référentiels, planification pédagogique, présences, livret numérique et évaluations",
          "Développé la plateforme d'enquête d'insertion et contribué à 3 plateformes en ligne : recrutement Daikin, recrutement E2C-TIC, offres d'emploi (emplois.daip.ci)",
          "Travaillé en méthode Agile au sein d'une équipe de 5 développeurs",
          "Formé et assisté les utilisateurs de 112 établissements (guides et vidéos d'utilisation)",
        ],
        stack: "PHP · Symfony · Doctrine ORM · Twig · Bootstrap 5 · Git · Agile",
      },
      freelance: {
        role: "Développeur Full-Stack · Freelance",
        company: "Multi-Nettoyage 94 · Paris, France (à distance)",
        period: "Janv. – Mars 2026",
        tasks: [
          "Développé de A à Z une application de gestion de devis (immeubles, maisons, bureaux) en Symfony et MySQL",
          "Conçu la base de données et modélisé les entités avec Doctrine ORM",
          "Automatisé la génération des devis PDF (DomPDF) et leur envoi par e-mail (SMTP) en quelques secondes",
          "Mis en place un back-office sécurisé (rôles, tableau de bord) et déployé l'application sur o2switch",
        ],
        stack:
          "PHP · Symfony · Doctrine ORM · MySQL · Twig · DomPDF · SMTP · Git · o2switch",
        note: "Mission réalisée à distance depuis Abidjan, en parallèle du stage",
      },
      certifications: [
        {
          title: "Software Developer Bootcamp",
          school: "GOMYCODE",
          period: "Juil. 2025",
          link: "https://diploma.gomycode.app/?id=31749747961710341",
          image: "/images/certificates/gomycode-software-developer.webp",
        },
        {
          title: "Getting Started with Microsoft Word",
          school: "Coursera · projet guidé",
          period: "Juil. 2026",
          link: "https://coursera.org/share/8a7b12a6fdbb3f4afa45d04812cfaa96",
          image: "/images/certificates/coursera-word.webp",
        },
        {
          title: "Designing and Formatting a Presentation in PowerPoint",
          school: "Coursera · projet guidé",
          period: "Juil. 2026",
          link: "https://coursera.org/share/b5bc2e0acda30161dce4849c59bce43e",
          image: "/images/certificates/coursera-powerpoint.webp",
        },
      ],
      education: [
        {
          title: "CQP – Développeur Web",
          school: "E2C-TIC",
          period: "2024 – 2025",
        },
        {
          title: "Licence 3 – Développement d'applications & eService",
          school: "Université Virtuelle de Côte d'Ivoire",
          period: "2023 – 2024",
        },
        {
          title: "BTS Informatique – Développeur d'applications",
          school: "École Supérieure Saint Chalmel · diplôme obtenu",
          period: "2020 – 2022",
        },
      ],
    },
    questions: {
      title: "Pourquoi travailler avec moi ?",
      subtitle: "Ce que j'apporte, preuves à l'appui.",
      items: [
        {
          title: "Des projets livrés",
          desc: "De la plateforme nationale 1Jeune1Métier à une application de devis livrée seul pour un client en France : je mène un projet jusqu'à sa mise en production.",
        },
        {
          title: "Une stack full-stack",
          desc: "PHP/Symfony et MySQL côté serveur, React.js et Node.js/Express côté JavaScript, API REST sécurisées par JWT.",
        },
        {
          title: "Équipe & pédagogie",
          desc: "Méthode Agile en équipe de 5 développeurs, échanges avec un client à distance et formation des utilisateurs de 112 établissements.",
        },
      ],
    },
    contact: {
      title: "Envie de collaborer ?",
      subtitle:
        "Vous avez un projet, une idée ou simplement envie d'échanger ? Contactez-moi !",
      cta: "Parlons-en",
      email: "Email",
      phone: "Téléphone",
      location: "Localisation",
      locationValue: "Abidjan, Côte d'Ivoire",
      linkedin: "LinkedIn",
      github: "GitHub",
      sendEmail: "Envoyer un email",
    },
    footer: {
      brand: "Isaac Koffi",
      tagline: "Développeur Web Full-Stack Junior · Abidjan",
      navigation: "Navigation",
      social: "Réseaux",
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experiences: "Experience",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Isaac Koffi",
      role: "Junior Full-Stack Web Developer",
      description:
        "Over a year of internship and freelance experience: I contributed to the national 1Jeune1Métier platform and single-handedly delivered a quote management app for a client in France.",
      typedPrefix: "Specialized in",
      typedRoles: ["PHP / Symfony", "React.js", "Node.js & Express", "REST APIs"],
      robotLabel:
        "Animated robot that turns its head toward the cursor. Drag it around (arrow keys, Escape or double-click to send it home).",
      scrollHint: "Scroll to skills",
      viewProjects: "View my projects",
      downloadCV: "Download CV",
    },
    presentation: {
      title: "Skills",
      heading: "Tech",
      headingHighlight: "Stack",
      hint: "Hover a bubble to gather the stack, click to scatter it.",
      hintTouch: "Tap a bubble to gather the stack around it.",
      frontend: "Frontend",
      backend: "Backend",
      database: "Databases & Tools",
    },
    developerInfo: {
      title: "Junior Full-Stack Web Developer",
      texts: [
        "Junior full-stack web developer based in Abidjan, holding a Bachelor's degree in application development (Virtual University of Côte d'Ivoire).",
        "Over a year of experience across my internship at DAIP and my freelance work.",
        "At DAIP, I built 3 modules of the national 1Jeune1Métier platform within a team of 5 developers, using Agile.",
        "As a freelancer, I single-handedly delivered a quote management app for Multi-Nettoyage 94, a company based in France — from design to deployment.",
        "On the backend I work with PHP/Symfony and MySQL; on the JavaScript side, React.js and Node.js/Express (GOMYCODE Software Developer Bootcamp certificate).",
        "I also enjoy teaching: I trained and supported users from 112 institutions with user guides and videos.",
        "I'm currently looking for a junior web or full-stack developer position.",
        "A project or an opportunity? Let's talk.",
      ],
    },
    projects: {
      title: "My",
      titleHighlight: "projects",
      viewProject: "Visit site",
      sourceCode: "Source code",
      otherProjects: "Other projects",
      screenshotAlt: "Screenshot of the site",
      daip: {
        title: "National 1Jeune1Métier Platform – DAIP",
        description:
          "Built 3 modules of the national platform: job prospecting, equipment and reference data, teaching schedules, attendance, digital record book and assessments. Users from 112 institutions trained and supported.",
      },
      daikin: {
        title: "Daikin Recruitment Platform – DAIP",
        description:
          "Contributed to the recruitment platform for the DAIKIN project (Second Chance School, METFPA): online applications, candidate area with dashboard, admission results publishing and post-training follow-up survey.",
      },
      ecommerce: {
        title: "Full-Stack E-Commerce App",
        description:
          "Online store: catalog, cart, orders, user management and JWT authentication. REST API tested with Postman, images handled via Cloudinary, deployed on Vercel and Render.",
      },
      etatCivil: {
        title: "Civil Registry Platform",
        description:
          "Citizen interface for online requests. Validation/deletion dashboard for civil registrar. PDF generation, monthly statistics.",
      },
      blog: {
        title: "PHP/Symfony Blog",
        description:
          "Full CRUD for articles and comments, admin/visitor role management. Authentication, authorization and security – responsive Tailwind CSS design.",
      },
      taskManager: {
        title: "Task Manager",
        description:
          "Intuitive application to create, edit and track daily tasks.",
      },
      multiNettoyage: {
        title: "Quote Management – Multi-Nettoyage 94",
        description:
          "Quote management app (buildings, houses, offices) built single-handedly from scratch. PDF quotes generated (DomPDF) and emailed within seconds, secure back office with roles and dashboard. Deployed on o2switch.",
      },
    },
    experiences: {
      title: "My",
      titleHighlight: "experience",
      experienceTitle: "Professional Experience",
      educationTitle: "Education & certifications",
      educationTab: "Education",
      certificationsTab: "Certifications",
      viewCertificate: "View certificate",
      certificateAlt: "Certificate",
      intern: {
        role: "PHP/Symfony Developer · Internship",
        company:
          "DAIP, Abidjan – Directorate of Apprenticeship and Professional Integration",
        period: "Jun 2025 – Jul 2026",
        tasks: [
          "Built 3 modules of the national 1Jeune1Métier platform (1jeune1metier.daip.ci): job prospecting, equipment and reference data, teaching schedules, attendance, digital record book and assessments",
          "Built the employment-outcome survey platform and contributed to 3 online platforms: Daikin recruitment, E2C-TIC recruitment, job board (emplois.daip.ci)",
          "Worked in Agile within a team of 5 developers",
          "Trained and supported users from 112 institutions (user guides and videos)",
        ],
        stack: "PHP · Symfony · Doctrine ORM · Twig · Bootstrap 5 · Git · Agile",
      },
      freelance: {
        role: "Full-Stack Developer · Freelance",
        company: "Multi-Nettoyage 94 · Paris, France (remote)",
        period: "Jan – Mar 2026",
        tasks: [
          "Built a quote management application (buildings, houses, offices) from scratch with Symfony and MySQL",
          "Designed the database and modeled the entities with Doctrine ORM",
          "Automated PDF quote generation (DomPDF) and email delivery (SMTP) within seconds",
          "Set up a secure back office (roles, dashboard) and deployed the app on o2switch",
        ],
        stack:
          "PHP · Symfony · Doctrine ORM · MySQL · Twig · DomPDF · SMTP · Git · o2switch",
        note: "Remote mission from Abidjan, alongside the internship",
      },
      certifications: [
        {
          title: "Software Developer Bootcamp",
          school: "GOMYCODE",
          period: "Jul 2025",
          link: "https://diploma.gomycode.app/?id=31749747961710341",
          image: "/images/certificates/gomycode-software-developer.webp",
        },
        {
          title: "Getting Started with Microsoft Word",
          school: "Coursera · Guided Project",
          period: "Jul 2026",
          link: "https://coursera.org/share/8a7b12a6fdbb3f4afa45d04812cfaa96",
          image: "/images/certificates/coursera-word.webp",
        },
        {
          title: "Designing and Formatting a Presentation in PowerPoint",
          school: "Coursera · Guided Project",
          period: "Jul 2026",
          link: "https://coursera.org/share/b5bc2e0acda30161dce4849c59bce43e",
          image: "/images/certificates/coursera-powerpoint.webp",
        },
      ],
      education: [
        {
          title: "CQP – Web Developer",
          school: "E2C-TIC",
          period: "2024 – 2025",
        },
        {
          title: "Bachelor's Degree – Application Development & eServices",
          school: "Virtual University of Côte d'Ivoire",
          period: "2023 – 2024",
        },
        {
          title: "BTS in Computer Science – Application Developer",
          school: "École Supérieure Saint Chalmel · graduated",
          period: "2020 – 2022",
        },
      ],
    },
    questions: {
      title: "Why work with me?",
      subtitle: "What I bring, backed by real work.",
      items: [
        {
          title: "Shipped projects",
          desc: "From the national 1Jeune1Métier platform to a quote app delivered single-handedly for a client in France: I take projects all the way to production.",
        },
        {
          title: "A full-stack toolkit",
          desc: "PHP/Symfony and MySQL on the server, React.js and Node.js/Express on the JavaScript side, REST APIs secured with JWT.",
        },
        {
          title: "Teamwork & teaching",
          desc: "Agile in a team of 5 developers, remote communication with a client, and user training across 112 institutions.",
        },
      ],
    },
    contact: {
      title: "Let's collaborate!",
      subtitle: "Have a project, an idea or just want to chat? Contact me!",
      cta: "Let's talk",
      email: "Email",
      phone: "Phone",
      location: "Location",
      locationValue: "Abidjan, Côte d'Ivoire",
      linkedin: "LinkedIn",
      github: "GitHub",
      sendEmail: "Send an email",
    },
    footer: {
      brand: "Isaac Koffi",
      tagline: "Junior Full-Stack Web Developer · Abidjan",
      navigation: "Navigation",
      social: "Social",
      rights: "All rights reserved.",
    },
  },
};

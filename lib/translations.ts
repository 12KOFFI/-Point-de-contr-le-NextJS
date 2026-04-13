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
      role: "Développeur Web Full-Stack",
      typedText:
        "Développeur web full-stack passionné, spécialisé en PHP/Symfony et React.js. Je crée des applications web performantes et modernes.",
      viewProjects: "Voir mes projets",
      downloadCV: "Télécharger CV",
    },
    presentation: {
      title: "Compétences",
      frontend: "Frontend",
      backend: "Backend",
      database: "Bases de données & Outils",
    },
    developerInfo: {
      title: "Développeur Web Full-Stack",
      texts: [
        "Développeur web full-stack passionné, curieux et rigoureux.",
        "Spécialisé en PHP/Symfony et React.js, avec une expérience concrète en développement de solutions métier sur mesure.",
        "Je maîtrise le cycle complet de développement : de la conception à la mise en production.",
        "Expérience en gestion de projets en mode remote et méthodologie agile.",
        "Mon objectif est de créer des interfaces fluides, accessibles et centrées sur l'utilisateur.",
        "J'accorde une importance particulière à l'optimisation, à l'expérience utilisateur et aux bonnes pratiques de développement.",
        "Chaque ligne de code que j'écris vise à offrir une expérience exceptionnelle à l'utilisateur final.",
        "Vous avez une idée ? Discutons-en, et donnons-lui vie ensemble.",
      ],
    },
    projects: {
      title: "Mes",
      titleHighlight: "projets",
      viewProject: "Voir le projet",
      ecommerce: {
        title: "Application E-Commerce",
        description:
          "Interface client et admin : gestion produits, utilisateurs, commandes. Authentification sécurisée, upload d'images via Cloudinary. API REST, déploiement sur Vercel + Render.",
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
    },
    experiences: {
      title: "Mes",
      titleHighlight: "expériences",
      experienceTitle: "Expériences professionnelles",
      educationTitle: "Formation",
      freelance: {
        role: "Développeur PHP/Symfony – Freelance",
        company: "Multi-Nettoyage 94 · Paris, France (remote)",
        period: "2025 – 2026",
        tasks: [
          "Développement from scratch d'une application web de gestion de devis (immeubles, maisons, bureaux)",
          "Conception de la base de données, modélisation des entités et relations avec Doctrine ORM",
          "Développement des modules : création, édition et suivi de devis clients",
          "Génération automatique de devis en PDF via DomPDF",
          "Envoi automatisé des devis aux clients par e-mail (SMTP)",
          "Mise en place de l'interface d'administration",
          "Déploiement et hébergement de l'application sur o2switch",
        ],
        stack:
          "PHP · Symfony · Doctrine ORM · MySQL · Twig · DomPDF · SMTP · Git · o2switch",
        note: "Mission réalisée à distance depuis Abidjan",
      },
      intern: {
        role: "Stagiaire Développeur PHP/Symfony",
        company:
          "DAIP – Direction de l'Apprentissage et de l'Insertion Professionnelle",
        period: "Juin 2025 – Fév. 2026",
        tasks: [
          "Participation au développement d'une application de gestion de recrutements",
          "Implémentation de fonctionnalités backend avec PHP/Symfony (routes, formulaires, entités)",
          "Contribution à l'intégration frontend avec Bootstrap et Twig",
          "Travail en équipe avec Git et méthodologie agile",
        ],
      },
      education: [
        {
          title: "CQP – Développeur Web",
          school: "E2C",
          period: "2024 – 2025",
        },
        {
          title: "Certification Full-Stack JavaScript",
          school: "GoMyCode",
          period: "2024 – 2025",
        },
        {
          title: "Licence 3 – Dév. Applications",
          school: "Univ. Virtuelle de Côte d'Ivoire",
          period: "2023 – 2024",
        },
        {
          title: "BTS Informatique – Option IDA",
          school: "École Sup. Saint Chalmel",
          period: "2020 – 2022",
        },
      ],
    },
    questions: {
      title: "Pourquoi travailler avec moi ?",
      subtitle:
        "Voici ce que je vous propose à travers mes services et mes projets.",
      items: [
        {
          title: "Performance & qualité",
          desc: "Je construis des apps rapides, optimisées et bien structurées, selon les meilleures pratiques du web moderne.",
        },
        {
          title: "Stack moderne",
          desc: "PHP/Symfony, React.js, Next.js, Node.js, Tailwind... Je maîtrise les outils récents pour livrer des projets solides et maintenables.",
        },
        {
          title: "Expérience UX/UI",
          desc: "Je conçois des interfaces claires, intuitives et esthétiques qui offrent une vraie valeur à l'utilisateur.",
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
      tagline: "Développeur Web Full-Stack passionné",
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
      role: "Full-Stack Web Developer",
      typedText:
        "Passionate full-stack web developer, specialized in PHP/Symfony and React.js. I build performant and modern web applications.",
      viewProjects: "View my projects",
      downloadCV: "Download CV",
    },
    presentation: {
      title: "Skills",
      frontend: "Frontend",
      backend: "Backend",
      database: "Databases & Tools",
    },
    developerInfo: {
      title: "Full-Stack Web Developer",
      texts: [
        "Passionate, curious and rigorous full-stack web developer.",
        "Specialized in PHP/Symfony and React.js, with hands-on experience in developing custom business solutions.",
        "I master the complete development cycle: from design to production deployment.",
        "Experience in remote project management and agile methodology.",
        "My goal is to create smooth, accessible and user-centered interfaces.",
        "I pay particular attention to optimization, user experience and development best practices.",
        "Every line of code I write aims to deliver an exceptional experience to the end user.",
        "Have an idea? Let's discuss it and bring it to life together.",
      ],
    },
    projects: {
      title: "My",
      titleHighlight: "projects",
      viewProject: "View project",
      ecommerce: {
        title: "E-Commerce Application",
        description:
          "Client and admin interface: product, user, and order management. Secure authentication, image upload via Cloudinary. REST API, deployed on Vercel + Render.",
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
    },
    experiences: {
      title: "My",
      titleHighlight: "experience",
      experienceTitle: "Professional Experience",
      educationTitle: "Education",
      freelance: {
        role: "PHP/Symfony Developer – Freelance",
        company: "Multi-Nettoyage 94 · Paris, France (remote)",
        period: "2025 – 2026",
        tasks: [
          "Full development of a quote management web application (buildings, houses, offices)",
          "Database design, entity modeling and relationships with Doctrine ORM",
          "Development of modules: creation, editing and tracking of client quotes",
          "Automatic PDF quote generation via DomPDF",
          "Automated email sending of quotes to clients (SMTP)",
          "Implementation of the administration interface",
          "Deployment and hosting on o2switch",
        ],
        stack:
          "PHP · Symfony · Doctrine ORM · MySQL · Twig · DomPDF · SMTP · Git · o2switch",
        note: "Remote mission from Abidjan",
      },
      intern: {
        role: "PHP/Symfony Developer Intern",
        company:
          "DAIP – Directorate of Apprenticeship and Professional Integration",
        period: "Jun 2025 – Feb 2026",
        tasks: [
          "Participation in developing a recruitment management application",
          "Implementation of backend features with PHP/Symfony (routes, forms, entities)",
          "Contribution to frontend integration with Bootstrap and Twig",
          "Team collaboration with Git and agile methodology",
        ],
      },
      education: [
        { title: "CQP – Web Developer", school: "E2C", period: "2024 – 2025" },
        {
          title: "Full-Stack JavaScript Certification",
          school: "GoMyCode",
          period: "2024 – 2025",
        },
        {
          title: "Bachelor's – App Development",
          school: "Virtual University of Ivory Coast",
          period: "2023 – 2024",
        },
        {
          title: "BTS Computer Science – IDA",
          school: "École Sup. Saint Chalmel",
          period: "2020 – 2022",
        },
      ],
    },
    questions: {
      title: "Why work with me?",
      subtitle: "Here is what I offer through my services and projects.",
      items: [
        {
          title: "Performance & Quality",
          desc: "I build fast, optimized and well-structured apps, following modern web best practices.",
        },
        {
          title: "Modern Stack",
          desc: "PHP/Symfony, React.js, Next.js, Node.js, Tailwind... I master the latest tools to deliver solid and maintainable projects.",
        },
        {
          title: "UX/UI Experience",
          desc: "I design clear, intuitive and aesthetic interfaces that offer real value to the user.",
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
      locationValue: "Abidjan, Ivory Coast",
      linkedin: "LinkedIn",
      github: "GitHub",
      sendEmail: "Send an email",
    },
    footer: {
      brand: "Isaac Koffi",
      tagline: "Passionate Full-Stack Web Developer",
      navigation: "Navigation",
      social: "Social",
      rights: "All rights reserved.",
    },
  },
};

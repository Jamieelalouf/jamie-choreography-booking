document.documentElement.classList.add('js-enabled');

const serviceSelect = document.getElementById('serviceType');
const dancerInput = document.getElementById('dancerCount');
const estimateBtn = document.getElementById('estimateBtn');
const estimateOutput = document.getElementById('estimateOutput');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
const siteHeader = document.querySelector('.site-header');
const languageButtons = document.querySelectorAll('.lang-btn');
const descriptionMeta = document.querySelector('meta[name="description"]');
const addonsToggle = document.getElementById('addonsToggle');
const addonsPanel = document.getElementById('addonsPanel');

const pricing = {
  solo: 750,
  duo: 900,
  trio: 1050,
  smallBase: 1450,
  smallPerDancer: 75,
  largeBase: 1750,
  largePerDancer: 65,
};

const translations = {
  en: {
    pageTitle: 'Book Jamie | Choreography, Workshops, Team Coaching & VISION Labs',
    pageDescription: 'Book Jamie for competitive choreography, workshops, team coaching, and In-Studio VISION Labs.',
    nav: { menu: 'Menu', about: 'About', services: 'Services', rates: 'Rates', labs: 'Labs', booking: 'Booking' },
    hero: {
      kicker: 'CHOREOGRAPHY · WORKSHOPS · TEAM COACHING · VISION LABS',
      headlineLine1: 'Workshops.',
      headlineLine2: 'Choreography',
      headlineLine3: 'Dancer development.',
      body: 'Book Jamie for competitive choreography, high-impact hip-hop workshops, team coaching, or an in-studio VISION Labs experience combining movement, mindset, theory, and performance development.',
      instagramLabel: '@jamieelalouf',
      ctaQuote: 'Request a quote',
      ctaServices: 'Explore services',
      ctaRates: 'See rates',
    },
    about: {
      title: 'About Jamie',
      body1: 'Jamie Elalouf is a Montreal-based professional hip-hop dancer, choreographer, and founder of VISION Dance Camp. With over 15 years of teaching experience and 70+ routines brought to the stage, he helps studios and competitive teams create stage-ready choreography, sharpen performance quality, and train with more intention.',
      body2: 'His approach blends movement, musicality, mindset, and structure — giving dancers not just choreography to perform, but tools they can carry into every class, rehearsal, and stage opportunity.',
    },
    credibility: {
      title: 'Experience that goes beyond choreography',
      body: 'Jamie Elalouf is a professional dancer, choreographer, educator, and founder of VISION Dance Convention, one of Canada’s leading hip-hop dance training events. He has judged for Hip Hop Canada and World of Dance, choreographed 70+ competitive routines, taught internationally, and worked with dancers across multiple levels through workshops, choreography, competitive coaching, and VISION LABS-style development sessions.',
      cards: {
        routines: { value: '70+', label: 'Competitive routines choreographed' },
        hhc: { value: 'Hip Hop Canada', label: 'Judging experience' },
        wod: { value: 'World of Dance', label: 'Judging experience' },
        international: { value: 'International', label: 'Teaching experience' },
        convention: { value: 'VISION Dance Convention', label: 'Founder of one of Canada’s leading hip-hop training events' },
        labs: { value: 'VISION LABS', label: 'Creator of a structured dancer development program' },
      },
    },
    proof: { 1: 'Professional dancer', 2: 'Founder of VISION', 3: 'Choreography + workshops' },
    services: {
      title: 'Ways to work with Jamie',
      card1Title: 'Competitive Choreography',
      card1Body: 'Custom choreography for solos, duos, trios, small groups, and competitive teams — built with musicality, texture, staging, and performance quality in mind.',
      card1GoodFor: 'Good for: Solos, duos, trios, groups, full competitive routines',
      card2Title: 'Studio Workshops',
      card2Body: 'High-impact hip-hop workshops focused on grooves, textures, musicality, performance, and clean execution.',
      card2GoodFor: 'Good for: Drop-in workshops, intensives, guest classes, summer training',
      card3Title: 'Competitive Team Coaching',
      card3Body: 'Focused coaching sessions to clean routines, improve transitions, sharpen performance quality, and prepare dancers for competition season.',
      card3GoodFor: 'Good for: Full teams, pre-competition prep, cleaning sessions, performance direction',
      card4Title: 'In-Studio VISION Labs',
      card4Body: 'A curated training experience combining dance, theory, mindset, reflection, and workbook exercises to help dancers understand how to train, think, and perform at the next level.',
      card4GoodFor: 'Good for: Serious students, competitive teams, mindset training, dancer development',
      cta: 'Not sure what your studio needs? Request a quote and I’ll recommend the best format.',
    },
    labs: {
      title: 'In-Studio VISION Labs',
      subtitle: 'A curated dancer development experience for studios that want more than a regular workshop.',
      body: 'VISION Labs is a training experience built around both movement and mindset. Dancers spend time learning choreography, exploring performance quality, and reflecting through guided theory and workbook exercises. The goal is to help students understand how they train, how they perform, and what they need to improve to reach the next level.',
      card1Title: '50% movement',
      card1Body: 'Choreography, grooves, performance quality, musicality, and execution.',
      card2Title: '50% theory',
      card2Body: 'Guided conversations, reflection prompts, workbook exercises, and training concepts.',
      card3Title: 'Built for growth',
      card3Body: 'Dancers leave with more clarity, stronger intention, and a better understanding of how to improve.',
      workbook: 'View sample workbook',
      cta: 'Bring VISION Labs to your studio',
      trainingLabel: 'Get a feel for the training',
      trainingClip1: 'Training clip 01',
      trainingClip2: 'Training clip 02',
    },
    why: {
      title: 'Why studios book Jamie',
      card1Title: 'Competitive-ready choreography',
      card1Body: 'Routines built with staging, musicality, texture, and performance in mind.',
      card2Title: 'Performance-first coaching',
      card2Body: 'Dancers learn how to execute, not just memorize steps.',
      card3Title: 'Clear rehearsal structure',
      card3Body: 'Sessions are focused, organized, and easy for studio directors to follow.',
      card4Title: 'Mindset + theory',
      card4Body: 'Through VISION Labs-style training, dancers learn how to think about their growth.',
      card5Title: 'Studio-friendly communication',
      card5Body: 'Clear expectations, simple booking, and professional follow-up.',
      card6Title: 'Dancers leave sharper',
      card6Body: 'The goal is for students to leave with tools, not just choreography.',
    },
    rates: {
      title: 'Choreography rates',
      intro: 'Choreography rates are based on routine length, number of dancers, rehearsal structure, and the amount of cleaning or performance coaching needed. Each package includes an initial choreography session, basic cleaning, and routine structure support. Additional coaching, polishing, and travel can be added if needed.',
      note: 'Rates may vary depending on routine length, rehearsal format, travel, and additional coaching needs.',
      cards: {
        solo: {
          type: 'Solo choreography',
          price: '$750',
          items: {
            1: 'Up to 2:00 minutes of choreography',
            2: 'One 3-hour in-studio choreography session',
            3: 'Cleaning during the session',
            4: 'Music mix included',
            5: 'One short follow-up video feedback round',
          },
        },
        duo: {
          type: 'Duo choreography',
          price: '$900',
          items: {
            1: 'Up to 2:00 minutes of choreography',
            2: 'One 3-hour in-studio choreography session',
            3: 'Spacing and partner work',
            4: 'Cleaning during the session',
            5: 'Music mix included',
            6: 'One short follow-up video feedback round',
          },
        },
        trio: {
          type: 'Trio choreography',
          price: '$1,050',
          items: {
            1: 'Up to 2:30 minutes of choreography',
            2: 'One 3-hour in-studio choreography session',
            3: 'Formation and spacing work',
            4: 'Cleaning during the session',
            5: 'Music mix included',
            6: 'One short follow-up video feedback round',
          },
        },
        small: {
          type: 'Small group choreography',
          price: '4–9 dancers · $1,450 base + $75/dancer',
          items: {
            1: '2:30–3:00 minutes of choreography',
            2: 'One 3-hour in-studio choreography session',
            3: 'Formation and spacing work',
            4: 'Cleaning during the session',
            5: 'Music mix included',
            6: 'One short follow-up video feedback round',
          },
        },
        large: {
          type: 'Large group choreography',
          price: '10–19 dancers · $1,750 base + $65/dancer',
          items: {
            1: 'Up to 3:00 minutes of choreography',
            2: 'One 3-hour in-studio choreography session',
            3: 'Formation and spacing work',
            4: 'Cleaning during the session',
            5: 'Music mix included',
            6: 'One short follow-up video feedback round',
          },
        },
        line: {
          type: 'Line / production choreography',
          price: '20+ dancers · Custom quote, usually $2,950+',
          items: {
            1: 'Custom routine structure',
            2: 'Formation and staging plan',
            3: 'Choreography session plan based on group size',
            4: 'Cleaning and coaching options available',
            5: 'Quote based on length, number of dancers, rehearsal time, and production needs',
          },
        },
      },
      addons: {
        title: 'Additional choreography support',
        toggleLabel: 'View add-ons',
        intro: 'Add-ons are available for studios or dancers who want extra support beyond the initial choreography session.',
        items: {
          1: 'Additional rehearsal / cleaning session: $150/hour',
          2: 'Extra choreography time: $150/hour',
        },
      },
    },
    calc: {
      title: 'Quick estimate',
      body: 'Use this tool for a clean estimate range. Final quotes are confirmed after booking details are reviewed.',
      serviceLabel: 'Service type',
      dancerLabel: 'Dancer count',
      optionSolo: 'Solo',
      optionDuo: 'Duo',
      optionTrio: 'Trio',
      optionSmall: 'Small group (4–9)',
      optionLarge: 'Large group (10–19)',
      optionLine: 'Line / production (20+)',
      button: 'Calculate',
      initial: 'Estimate: —',
      invalidDancers: 'Please enter a valid dancer count.',
      customLarge: 'Custom quote, usually $2,950+ for 20+ dancers.',
      estimatedRate: 'Estimated rate',
      baseLabel: 'base',
      perDancerLabel: 'dancer',
      smallRange: 'Small group is designed for 4-9 dancers.',
      largeRange: 'Large group is designed for 10-19 dancers.',
      customAvailable: 'Custom quotes are available.',
    },
    workshops: {
      title: 'Workshops + team training',
      intro: 'Book Jamie for focused hip-hop training, competitive team coaching, or studio intensives built around your dancers’ needs.',
      card1Title: '1-hour workshop $300/hour',
      card1Body: 'Best for focused training in musicality, texture, grooves, performance, or hip-hop foundations.',
      card2Title: 'Discounted packages available',
      card2Body: 'Contact Jamie for details if you want a longer or multi-class package.',
      card3Title: 'Competitive team coaching custom quote',
      card3Body: 'Best for cleaning routines, improving transitions, sharpening performance, and preparing for competition season.',
      card4Title: 'In-Studio VISION Labs custom quote',
      card4Body: 'Best for studios that want a curated mix of dance training, theory, mindset, and workbook-based development.',
      cta: 'Request a quote',
    },
    process: {
      title: 'How booking works',
      step1Title: 'Send a request',
      step1Body: 'Tell me what you’re looking for, your studio location, dancer level, group size, and preferred dates.',
      step2Title: 'Choose the right format',
      step2Body: 'I’ll help recommend the best option: choreography, workshop, team coaching, or VISION Labs.',
      step3Title: 'Confirm the details',
      step3Body: 'We lock in the date, rate, schedule, and expectations.',
      step4Title: 'Train with purpose',
      step4Body: 'I come in with a clear plan so your dancers leave sharper, more confident, and more prepared.',
    },
    booking: {
      ctaTitle: 'Ready to bring Jamie to your studio?',
      ctaSubtitle: 'Whether you need choreography, workshops, team coaching, or a full VISION Labs-style training experience, send a request and I’ll help build the right format for your dancers.',
      topCta: 'Email me here',
    },
  },
  fr: {
    pageTitle: 'Réserver Jamie | Chorégraphie, ateliers, coaching d’équipe et VISION Labs',
    pageDescription: 'Réservez Jamie pour la chorégraphie compétitive, les ateliers, le coaching d’équipe et les VISION Labs en studio.',
    nav: { menu: 'Menu', about: 'À propos', services: 'Services', rates: 'Tarifs', labs: 'Labs', booking: 'Réservation' },
    hero: {
      kicker: 'CHORÉGRAPHIE · ATELIERS · COACHING D’ÉQUIPE · VISION LABS',
      headlineLine1: 'Workshops.',
      headlineLine2: 'Choreography',
      headlineLine3: 'Dancer development.',
      body: 'Réservez Jamie pour de la chorégraphie compétitive, des ateliers hip-hop percutants, du coaching d’équipe, ou une expérience VISION Labs en studio qui combine mouvement, mindset, théorie et développement de performance.',
      instagramLabel: '@jamieelalouf',
      ctaQuote: 'Demander un devis',
      ctaServices: 'Voir les services',
      ctaRates: 'Voir les tarifs',
    },
    about: {
      title: 'À propos de Jamie',
      body1: 'Jamie Elalouf est un danseur hip-hop professionnel, chorégraphe et fondateur de VISION Dance Camp, basé à Montréal. Il travaille avec des studios et des équipes compétitives pour créer des chorégraphies précises, renforcer la qualité de performance et aider les danseurs à s’entraîner avec plus d’intention.',
      body2: 'Son approche combine mouvement, musicalité, mindset et structure — pour offrir non seulement une chorégraphie à performer, mais des outils utiles dans chaque cours, répétition et opportunité de scène.',
    },
    credibility: {
      title: 'Une expérience qui va au-delà de la chorégraphie',
      body: 'Jamie Elalouf est un danseur professionnel, chorégraphe, éducateur et fondateur de VISION Dance Convention, l’un des plus grands événements canadiens de formation hip-hop. Il a jugé pour Hip Hop Canada et World of Dance, chorégraphié plus de 70 routines compétitives, enseigné à l’international, et accompagné des danseurs de plusieurs niveaux à travers des ateliers, la chorégraphie, le coaching compétitif et des sessions de développement de style VISION LABS.',
      cards: {
        routines: { value: '70+', label: 'Routines compétitives chorégraphiées' },
        hhc: { value: 'Hip Hop Canada', label: 'Expérience en jugement' },
        wod: { value: 'World of Dance', label: 'Expérience en jugement' },
        international: { value: 'International', label: 'Expérience d’enseignement' },
        convention: { value: 'VISION Dance Convention', label: 'Fondateur de l’un des plus grands événements canadiens de formation hip-hop' },
        labs: { value: 'VISION LABS', label: 'Créateur d’un programme structuré de développement des danseurs' },
      },
    },
    proof: { 1: 'Danseur professionnel', 2: 'Fondateur de VISION', 3: 'Chorégraphie + ateliers' },
    services: {
      title: 'Façons de travailler avec Jamie',
      card1Title: 'Chorégraphie compétitive',
      card1Body: 'Routines sur mesure pensées pour l’impact en compétition, la clarté musicale et une exécution plus propre sous pression.',
      card1GoodFor: 'Idéal pour : Solos, duos, trios et routines d’équipe qui doivent être prêtes pour la compétition.',
      card2Title: 'Ateliers en studio',
      card2Body: 'Cours hip-hop à fort impact axés sur la qualité de mouvement, la texture, l’intention et la performance.',
      card2GoodFor: 'Idéal pour : Journées d’invité, intensifs et programmation de saison en studio.',
      card3Title: 'Coaching d’équipe compétitive',
      card3Body: 'Blocs de coaching ciblés pour affiner la chorégraphie existante, les transitions, le staging et la constance.',
      card3GoodFor: 'Idéal pour : Équipes qui se préparent aux régionales, nationales ou fins de semaine clés.',
      card4Title: 'VISION Labs en studio',
      card4Body: 'Format de développement structuré qui combine entraînement de mouvement et mindset pour des danseurs plus solides.',
      card4GoodFor: 'Idéal pour : Studios qui veulent un développement durable au-delà d’une seule session.',
      cta: 'Pas certain de ce dont votre studio a besoin? Demandez un devis et je vous recommanderai le meilleur format.',
    },
    labs: {
      title: 'VISION Labs en studio',
      subtitle: 'Une expérience de développement des danseurs conçue pour les studios qui veulent plus qu’un atelier standard.',
      body: 'VISION Labs est conçu comme une expérience structurée et studio-friendly : moitié mouvement, moitié théorie. Les danseurs entraînent la qualité de performance, l’intention musicale et l’exécution, tout en apprenant des concepts pratiques de mindset et de répétition applicables immédiatement. Le studio obtient un cadre clair de développement qui soutient les résultats compétitifs et la progression à long terme.',
      card1Title: '50% mouvement',
      card1Body: 'Blocs d’entraînement intentionnels axés sur le groove, le contrôle, la texture et la qualité de performance.',
      card2Title: '50% théorie',
      card2Body: 'Concepts de mindset et de répétition pour s’entraîner avec plus de clarté et de constance.',
      card3Title: 'Conçu pour la progression',
      card3Body: 'Structure studio-friendly qui renforce les habitudes, le feedback et un développement prêt compétition.',
      workbook: 'Voir un exemple de workbook',
      cta: 'Amener VISION Labs dans votre studio',
      trainingLabel: 'Aperçu de la formation',
      trainingClip1: 'Extrait 01',
      trainingClip2: 'Extrait 02',
    },
    why: {
      title: 'Pourquoi les studios réservent Jamie',
      card1Title: 'Chorégraphie prête compétition',
      card1Body: 'Les routines sont construites pour des visuels propres, une précision musicale et un impact sur scène.',
      card2Title: 'Coaching axé performance',
      card2Body: 'Le travail met l’accent sur la présence, la confiance et la constance.',
      card3Title: 'Structure claire de répétition',
      card3Body: 'Les sessions suivent des objectifs concrets pour optimiser le temps et les progrès.',
      card4Title: 'Mindset + théorie',
      card4Body: 'Les danseurs apprennent à réfléchir, s’ajuster et mieux se préparer entre répétitions.',
      card5Title: 'Communication studio-friendly',
      card5Body: 'Les directions reçoivent une planification claire et un suivi fiable.',
      card6Title: 'Des danseurs plus sharp',
      card6Body: 'Chaque session renforce le mouvement et les habitudes d’entraînement.',
    },
    rates: {
      title: 'Tarifs de chorégraphie',
      intro: 'Les tarifs de chorégraphie sont basés sur la durée de la routine, le nombre de danseurs, la structure de répétition et le niveau de nettoyage ou de coaching de performance requis. Chaque forfait inclut une session initiale de chorégraphie, un nettoyage de base et un soutien de structure de routine. Du coaching additionnel, du polissage et les déplacements peuvent être ajoutés au besoin.',
      note: 'Les tarifs peuvent varier selon la durée de la routine, le format de répétition, le déplacement et les besoins de coaching additionnels.',
      cards: {
        solo: {
          type: 'Chorégraphie solo',
          price: '$750',
          items: {
            1: 'Jusqu’à 2:00 minutes de chorégraphie',
            2: 'Une session de chorégraphie en studio de 3 heures',
            3: 'Nettoyage pendant la session',
            4: 'Mix musical inclus',
            5: 'Un court retour vidéo de suivi',
          },
        },
        duo: {
          type: 'Chorégraphie duo',
          price: '$900',
          items: {
            1: 'Jusqu’à 2:00 minutes de chorégraphie',
            2: 'Une session de chorégraphie en studio de 3 heures',
            3: 'Travail sur les espacements et le partenaire',
            4: 'Nettoyage pendant la session',
            5: 'Mix musical inclus',
            6: 'Un court retour vidéo de suivi',
          },
        },
        trio: {
          type: 'Chorégraphie trio',
          price: '$1,050',
          items: {
            1: 'Jusqu’à 2:30 minutes de chorégraphie',
            2: 'Une session de chorégraphie en studio de 3 heures',
            3: 'Travail de formation et d’espacement',
            4: 'Nettoyage pendant la session',
            5: 'Mix musical inclus',
            6: 'Un court retour vidéo de suivi',
          },
        },
        small: {
          type: 'Chorégraphie petit groupe',
          price: '4–9 danseurs · $1,450 de base + $75/danseur',
          items: {
            1: '2:30–3:00 minutes de chorégraphie',
            2: 'Une session de chorégraphie en studio de 3 heures',
            3: 'Travail de formation et d’espacement',
            4: 'Nettoyage pendant la session',
            5: 'Mix musical inclus',
            6: 'Un court retour vidéo de suivi',
          },
        },
        large: {
          type: 'Chorégraphie grand groupe',
          price: '10–19 danseurs · $1,750 de base + $65/danseur',
          items: {
            1: 'Jusqu’à 3:00 minutes de chorégraphie',
            2: 'Une session de chorégraphie en studio de 3 heures',
            3: 'Travail de formation et d’espacement',
            4: 'Nettoyage pendant la session',
            5: 'Mix musical inclus',
            6: 'Un court retour vidéo de suivi',
          },
        },
        line: {
          type: 'Chorégraphie ligne / production',
          price: '20+ danseurs · Devis personnalisé, habituellement $2,950+',
          items: {
            1: 'Structure de routine personnalisée',
            2: 'Plan de formation et de mise en scène',
            3: 'Plan de session de chorégraphie selon la taille du groupe',
            4: 'Options de nettoyage et de coaching disponibles',
            5: 'Devis basé sur la durée, le nombre de danseurs, le temps de répétition et les besoins de production',
          },
        },
      },
      addons: {
        title: 'Soutien chorégraphique additionnel',
        toggleLabel: 'Voir les ajouts',
        intro: 'Des ajouts sont disponibles pour les studios ou les danseurs qui veulent du soutien supplémentaire au-delà de la session initiale de chorégraphie.',
        items: {
          1: 'Session additionnelle de répétition / nettoyage: $150/heure',
          2: 'Temps additionnel de chorégraphie: $150/heure',
        },
      },
    },
    calc: {
      title: 'Estimation rapide',
      body: 'Utilisez cet outil pour une estimation propre. Le devis final est confirmé après l’analyse des détails.',
      serviceLabel: 'Type de service',
      dancerLabel: 'Nombre de danseurs',
      optionSolo: 'Solo',
      optionDuo: 'Duo',
      optionTrio: 'Trio',
      optionSmall: 'Petit groupe (4–9)',
      optionLarge: 'Grand groupe (10–19)',
      optionLine: 'Ligne / production (20+)',
      button: 'Calculer',
      initial: 'Estimation : —',
      invalidDancers: 'Veuillez entrer un nombre valide de danseurs.',
      customLarge: 'Devis personnalisé, habituellement $2,950+ pour 20+ danseurs.',
      estimatedRate: 'Tarif estimé',
      baseLabel: 'de base',
      perDancerLabel: 'danseur',
      smallRange: 'Le petit groupe est conçu pour 4 à 9 danseurs.',
      largeRange: 'Le grand groupe est conçu pour 10 à 19 danseurs.',
      customAvailable: 'Des devis personnalisés sont disponibles.',
    },
    workshops: {
      title: 'Ateliers + entraînement d’équipe',
      intro: 'Options d’entraînement studio-friendly axées sur la qualité de mouvement, les détails de performance et la préparation compétitive.',
      card1Title: 'Atelier de 1 heure $300/heure',
      card1Body: 'Session percutante pour une équipe ou un groupe ciblé.',
      card2Title: 'Forfaits à prix réduit disponibles',
      card2Body: 'Contactez Jamie pour les détails si vous voulez un format plus long ou multi-classes.',
      card3Title: 'Coaching d’équipe compétitive sur devis personnalisé',
      card3Body: 'Coaching ciblé pour affiner les sets existants et l’exécution sur scène.',
      card4Title: 'VISION Labs en studio sur devis personnalisé',
      card4Body: 'Format signature mouvement + mindset livré dans votre studio.',
      cta: 'Demander un devis',
    },
    process: {
      title: 'Comment la réservation fonctionne',
      step1Title: 'Envoyer une demande',
      step1Body: 'Partagez les infos du studio, les objectifs, le niveau et la période visée.',
      step2Title: 'Choisir le bon format',
      step2Body: 'On aligne la chorégraphie, l’atelier, le coaching d’équipe ou VISION Labs.',
      step3Title: 'Confirmer les détails',
      step3Body: 'On confirme tarifs, horaire, déplacement et structure de répétition.',
      step4Title: 'S’entraîner avec intention',
      step4Body: 'Vos danseurs reçoivent un entraînement précis, orienté performance.',
    },
    booking: {
      ctaTitle: 'Prêt à accueillir Jamie dans votre studio?',
      ctaSubtitle: 'Dites-nous ce dont votre équipe a besoin et vous recevrez un devis clair et studio-friendly.',
      topCta: 'Écrivez-moi ici',
    },
  },
};

let currentLanguage = localStorage.getItem('jamie-language') || 'en';
if (!translations[currentLanguage]) currentLanguage = 'en';

function t(key) {
  return key.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), translations[currentLanguage]);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function getEstimate(service, dancers) {
  const calc = translations[currentLanguage].calc;

  if (!Number.isFinite(dancers) || dancers < 1) return calc.invalidDancers;
  if (service === 'line' || dancers >= 20) return calc.customLarge;

  if (service === 'solo') return `${calc.estimatedRate}: ${formatCurrency(pricing.solo)}`;
  if (service === 'duo') return `${calc.estimatedRate}: ${formatCurrency(pricing.duo)}`;
  if (service === 'trio') return `${calc.estimatedRate}: ${formatCurrency(pricing.trio)}`;

  if (service === 'small') {
    if (dancers < 4 || dancers > 9) return calc.smallRange;
    const total = pricing.smallBase + dancers * pricing.smallPerDancer;
    return `${calc.estimatedRate}: ${formatCurrency(total)} (${formatCurrency(pricing.smallBase)} ${calc.baseLabel} + ${formatCurrency(pricing.smallPerDancer)}/${calc.perDancerLabel})`;
  }

  if (service === 'large') {
    if (dancers < 10 || dancers > 19) return calc.largeRange;
    const total = pricing.largeBase + dancers * pricing.largePerDancer;
    return `${calc.estimatedRate}: ${formatCurrency(total)} (${formatCurrency(pricing.largeBase)} ${calc.baseLabel} + ${formatCurrency(pricing.largePerDancer)}/${calc.perDancerLabel})`;
  }

  return calc.customAvailable;
}

function setEstimate() {
  const dancers = Number.parseInt(dancerInput?.value || '0', 10);
  if (!estimateOutput) return;
  estimateOutput.classList.add('flash');
  window.setTimeout(() => {
    estimateOutput.textContent = getEstimate(serviceSelect?.value || 'solo', dancers);
    estimateOutput.classList.remove('flash');
  }, 90);
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = key ? t(key) : undefined;
    if (typeof value === 'string') el.textContent = value;
  });

  document.title = translations[currentLanguage].pageTitle;
  if (descriptionMeta) descriptionMeta.setAttribute('content', translations[currentLanguage].pageDescription);

  languageButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === currentLanguage);
  });

  setEstimate();
}

estimateBtn?.addEventListener('click', setEstimate);
serviceSelect?.addEventListener('change', setEstimate);
dancerInput?.addEventListener('input', setEstimate);

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextLanguage = button.dataset.lang;
    if (!nextLanguage || !translations[nextLanguage] || nextLanguage === currentLanguage) return;
    currentLanguage = nextLanguage;
    localStorage.setItem('jamie-language', currentLanguage);
    applyTranslations();
  });
});

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

addonsToggle?.addEventListener('click', () => {
  if (!addonsPanel) return;
  const isExpanded = addonsToggle.getAttribute('aria-expanded') === 'true';
  addonsToggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  addonsPanel.hidden = isExpanded;
});

const navAnchors = document.querySelectorAll('.nav-links a');
const sections = [...navAnchors].map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if (sections.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
        });
      });
    },
    { threshold: 0.45 }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('in-view'));
  }
}

window.addEventListener('scroll', () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle('scrolled', window.scrollY > 12);
});

applyTranslations();

window.requestAnimationFrame(() => {
  document.documentElement.classList.add('hero-ready');
});

export { getEstimate, translations };

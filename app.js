document.documentElement.classList.add('js-enabled');

const serviceSelect = document.getElementById('serviceType');
const dancerInput = document.getElementById('dancerCount');
const estimateBtn = document.getElementById('estimateBtn');
const estimateOutput = document.getElementById('estimateOutput');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
const siteHeader = document.querySelector('.site-header');
const languageButtons = document.querySelectorAll('.lang-btn');
const bookingEmail = document.getElementById('bookingEmail');
const bookingForm = document.getElementById('booking-form');
const descriptionMeta = document.querySelector('meta[name="description"]');

const pricing = {
  solo: 750,
  duo: 900,
  trio: 1050,
  smallBase: 1200,
  smallPerDancer: 75,
  largeBase: 1500,
  largePerDancer: 60,
};

const translations = {
  en: {
    pageTitle: 'Book Jamie | Choreography, Workshops, Team Coaching & Vision Labs',
    pageDescription: 'Book Jamie for competitive choreography, workshops, team coaching, and In-Studio Vision Labs.',
    nav: { menu: 'Menu', about: 'About', services: 'Services', rates: 'Rates', labs: 'Labs', booking: 'Booking' },
    hero: {
      kicker: 'CHOREOGRAPHY · WORKSHOPS · TEAM COACHING · VISION LABS',
      headlineLine1: 'Train sharper.',
      headlineLine2: 'Perform stronger.',
      headlineLine3: 'Compete different.',
      body: 'Book Jamie for competitive choreography, high-impact hip-hop workshops, team coaching, or an in-studio Vision Labs experience combining movement, mindset, theory, and performance development.',
      instagramLabel: '@jamieelalouf',
      ctaQuote: 'Request a quote',
      ctaServices: 'Explore services',
      ctaRates: 'See rates',
    },
    about: {
      title: 'About Jamie',
      body: 'Jamie Elalouf is a Montreal-based professional hip-hop dancer, choreographer, and founder of VISION Dance Camp. He works with studios and competitive teams to create sharp choreography, strengthen performance quality, and help dancers understand how to train with more intention. His approach blends movement, musicality, mindset, and structure — giving dancers not just choreography to perform, but tools they can carry into every class, rehearsal, and stage opportunity.',
    },
    proof: { 1: 'Professional dancer', 2: 'Founder of VISION', 3: 'Choreography + workshops', 4: 'Vision Labs training' },
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
      card4Title: 'In-Studio Vision Labs',
      card4Body: 'A curated training experience combining dance, theory, mindset, reflection, and workbook exercises to help dancers understand how to train, think, and perform at the next level.',
      card4GoodFor: 'Good for: Serious students, competitive teams, mindset training, dancer development',
      cta: 'Not sure what your studio needs? Request a quote and I’ll recommend the best format.',
    },
    labs: {
      title: 'In-Studio Vision Labs',
      subtitle: 'A curated dancer development experience for studios that want more than a regular workshop.',
      body: 'Vision Labs is a training experience built around both movement and mindset. Dancers spend time learning choreography, exploring performance quality, and reflecting through guided theory and workbook exercises. The goal is to help students understand how they train, how they perform, and what they need to improve to reach the next level.',
      card1Title: '50% movement',
      card1Body: 'Choreography, grooves, performance quality, musicality, and execution.',
      card2Title: '50% theory',
      card2Body: 'Guided conversations, reflection prompts, workbook exercises, and training concepts.',
      card3Title: 'Built for growth',
      card3Body: 'Dancers leave with more clarity, stronger intention, and a better understanding of how to improve.',
      workbook: 'View sample workbook',
      cta: 'Bring Vision Labs to your studio',
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
      card4Body: 'Through Vision Labs-style training, dancers learn how to think about their growth.',
      card5Title: 'Studio-friendly communication',
      card5Body: 'Clear expectations, simple booking, and professional follow-up.',
      card6Title: 'Dancers leave sharper',
      card6Body: 'The goal is for students to leave with tools, not just choreography.',
    },
    rates: {
      title: 'Choreography rates',
      intro: 'Custom quotes are available depending on routine length, group size, travel, and studio needs.',
      solo: 'Solo choreography: $750',
      duo: 'Duo choreography: $900',
      trio: 'Trio choreography: $1,050',
      small: 'Small group, 4–9 dancers: $1,200 base + $75/dancer',
      large: 'Large group, 10–19 dancers: $1,500 base + $60/dancer',
      line: 'Line / production, 20+ dancers: Custom quote, usually $2,500+',
      note: 'Rates may vary depending on routine length, rehearsal format, travel, and additional coaching needs.',
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
      customLarge: 'Custom quote, usually $2,500+ for 20+ dancers.',
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
      card2Title: '3+ hour studio intensive discounted package available',
      card2Body: 'Best for deeper training, multi-class development, or a half-day intensive.',
      card3Title: 'Competitive team coaching custom quote',
      card3Body: 'Best for cleaning routines, improving transitions, sharpening performance, and preparing for competition season.',
      card4Title: 'In-Studio Vision Labs custom quote',
      card4Body: 'Best for studios that want a curated mix of dance training, theory, mindset, and workbook-based development.',
      cta: 'Request a quote',
    },
    process: {
      title: 'How booking works',
      step1Title: 'Send a request',
      step1Body: 'Tell me what you’re looking for, your studio location, dancer level, group size, and preferred dates.',
      step2Title: 'Choose the right format',
      step2Body: 'I’ll help recommend the best option: choreography, workshop, team coaching, or Vision Labs.',
      step3Title: 'Confirm the details',
      step3Body: 'We lock in the date, rate, schedule, and expectations.',
      step4Title: 'Train with purpose',
      step4Body: 'I come in with a clear plan so your dancers leave sharper, more confident, and more prepared.',
    },
    booking: {
      ctaTitle: 'Ready to bring Jamie to your studio?',
      ctaSubtitle: 'Whether you need choreography, workshops, team coaching, or a full Vision Labs-style training experience, send a request and I’ll help build the right format for your dancers.',
      topCta: 'Request a quote',
      topRates: 'View rates',
      title: 'Request a quote',
      name: 'Name',
      studio: 'Studio name',
      email: 'Email',
      city: 'City / Province',
      interest: 'What are you interested in?',
      interest1: 'Competitive choreography',
      interest2: 'Studio workshop',
      interest3: 'Team coaching',
      interest4: 'In-Studio Vision Labs',
      interest5: 'Not sure yet',
      dancers: 'Number of dancers',
      level: 'Dancer level',
      level1: 'Beginner',
      level2: 'Intermediate',
      level3: 'Advanced',
      level4: 'Competitive team',
      level5: 'Mixed levels',
      date: 'Preferred date or timeframe',
      message: 'Message / details',
      send: 'Send request',
      note: 'Clicking Send opens your email app with a prefilled message to Jamie. You must press send there to finish.',
      directEmail: 'Or email directly: jamie@visiondance.ca',
      subject: 'Booking Request for Jamie Elalouf',
    },
  },
  fr: {
    pageTitle: 'Réserver Jamie | Chorégraphie, ateliers, coaching d’équipe et Vision Labs',
    pageDescription: 'Réservez Jamie pour la chorégraphie compétitive, les ateliers, le coaching d’équipe et les Vision Labs en studio.',
    nav: { menu: 'Menu', about: 'À propos', services: 'Services', rates: 'Tarifs', labs: 'Labs', booking: 'Réservation' },
    hero: {
      kicker: 'CHORÉGRAPHIE · ATELIERS · COACHING D’ÉQUIPE · VISION LABS',
      headlineLine1: 'Entraîne-toi plus précis.',
      headlineLine2: 'Performe plus fort.',
      headlineLine3: 'Compétitionne autrement.',
      body: 'Réservez Jamie pour de la chorégraphie compétitive, des ateliers hip-hop percutants, du coaching d’équipe, ou une expérience Vision Labs en studio qui combine mouvement, mindset, théorie et développement de performance.',
      instagramLabel: '@jamieelalouf',
      ctaQuote: 'Demander un devis',
      ctaServices: 'Voir les services',
      ctaRates: 'Voir les tarifs',
    },
    about: {
      title: 'À propos de Jamie',
      body: 'Jamie Elalouf est un danseur hip-hop professionnel, chorégraphe et fondateur de VISION Dance Camp, basé à Montréal. Il travaille avec des studios et des équipes compétitives pour créer des chorégraphies précises, renforcer la qualité de performance et aider les danseurs à s’entraîner avec plus d’intention. Son approche combine mouvement, musicalité, mindset et structure — pour offrir non seulement une chorégraphie à performer, mais des outils utiles dans chaque cours, répétition et opportunité de scène.',
    },
    proof: { 1: 'Danseur professionnel', 2: 'Fondateur de VISION', 3: 'Chorégraphie + ateliers', 4: 'Formation Vision Labs' },
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
      card4Title: 'Vision Labs en studio',
      card4Body: 'Format de développement structuré qui combine entraînement de mouvement et mindset pour des danseurs plus solides.',
      card4GoodFor: 'Idéal pour : Studios qui veulent un développement durable au-delà d’une seule session.',
      cta: 'Pas certain de ce dont votre studio a besoin? Demandez un devis et je vous recommanderai le meilleur format.',
    },
    labs: {
      title: 'Vision Labs en studio',
      subtitle: 'Une expérience de développement des danseurs conçue pour les studios qui veulent plus qu’un atelier standard.',
      body: 'Vision Labs est conçu comme une expérience structurée et studio-friendly : moitié mouvement, moitié théorie. Les danseurs entraînent la qualité de performance, l’intention musicale et l’exécution, tout en apprenant des concepts pratiques de mindset et de répétition applicables immédiatement. Le studio obtient un cadre clair de développement qui soutient les résultats compétitifs et la progression à long terme.',
      card1Title: '50% mouvement',
      card1Body: 'Blocs d’entraînement intentionnels axés sur le groove, le contrôle, la texture et la qualité de performance.',
      card2Title: '50% théorie',
      card2Body: 'Concepts de mindset et de répétition pour s’entraîner avec plus de clarté et de constance.',
      card3Title: 'Conçu pour la progression',
      card3Body: 'Structure studio-friendly qui renforce les habitudes, le feedback et un développement prêt compétition.',
      workbook: 'Voir un exemple de workbook',
      cta: 'Amener Vision Labs dans votre studio',
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
      intro: 'Des devis personnalisés sont disponibles selon la durée de la routine, la taille du groupe, les déplacements et les besoins du studio.',
      solo: 'Chorégraphie solo: $750',
      duo: 'Chorégraphie duo: $900',
      trio: 'Chorégraphie trio: $1,050',
      small: 'Petit groupe, 4–9 danseurs: $1,200 de base + $75/danseur',
      large: 'Grand groupe, 10–19 danseurs: $1,500 de base + $60/danseur',
      line: 'Ligne / production, 20+ danseurs: Devis personnalisé, habituellement $2,500+',
      note: 'Les tarifs peuvent varier selon la durée de la routine, le format de répétition, le déplacement et les besoins de coaching additionnels.',
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
      customLarge: 'Devis personnalisé, habituellement $2,500+ pour 20+ danseurs.',
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
      card2Title: 'Intensif studio de 3+ heures, forfait réduit disponible',
      card2Body: 'Conçu pour les studios qui enchaînent plusieurs équipes dans une journée.',
      card3Title: 'Coaching d’équipe compétitive sur devis personnalisé',
      card3Body: 'Coaching ciblé pour affiner les sets existants et l’exécution sur scène.',
      card4Title: 'Vision Labs en studio sur devis personnalisé',
      card4Body: 'Format signature mouvement + mindset livré dans votre studio.',
      cta: 'Demander un devis',
    },
    process: {
      title: 'Comment la réservation fonctionne',
      step1Title: 'Envoyer une demande',
      step1Body: 'Partagez les infos du studio, les objectifs, le niveau et la période visée.',
      step2Title: 'Choisir le bon format',
      step2Body: 'On aligne la chorégraphie, l’atelier, le coaching d’équipe ou Vision Labs.',
      step3Title: 'Confirmer les détails',
      step3Body: 'On confirme tarifs, horaire, déplacement et structure de répétition.',
      step4Title: 'S’entraîner avec intention',
      step4Body: 'Vos danseurs reçoivent un entraînement précis, orienté performance.',
    },
    booking: {
      ctaTitle: 'Prêt à accueillir Jamie dans votre studio?',
      ctaSubtitle: 'Dites-nous ce dont votre équipe a besoin et vous recevrez un devis clair et studio-friendly.',
      topCta: 'Demander un devis',
      topRates: 'Voir les tarifs',
      title: 'Demander un devis',
      name: 'Nom',
      studio: 'Nom du studio',
      email: 'Courriel',
      city: 'Ville / Province',
      interest: 'Qu’est-ce qui vous intéresse?',
      interest1: 'Chorégraphie compétitive',
      interest2: 'Atelier en studio',
      interest3: 'Coaching d’équipe',
      interest4: 'Vision Labs en studio',
      interest5: 'Pas certain encore',
      dancers: 'Nombre de danseurs',
      level: 'Niveau des danseurs',
      level1: 'Débutant',
      level2: 'Intermédiaire',
      level3: 'Avancé',
      level4: 'Équipe compétitive',
      level5: 'Niveaux mixtes',
      date: 'Date ou période souhaitée',
      message: 'Message / détails',
      send: 'Envoyer la demande',
      note: 'En cliquant sur Envoyer, votre application courriel s’ouvre avec un message prérempli à Jamie. Vous devez cliquer sur envoyer dans cette application pour terminer.',
      directEmail: 'Ou écrire directement : jamie@visiondance.ca',
      subject: 'Demande de réservation pour Jamie Elalouf',
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

function setBookingMailto() {
  if (!bookingEmail) return;
  bookingEmail.href = 'mailto:jamie@visiondance.ca';
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

  setBookingMailto();
  setEstimate();
}

function toMailtoBody(formData) {
  const rows = [
    ['Name', formData.get('name') || ''],
    ['Studio name', formData.get('studio') || ''],
    ['Email', formData.get('email') || ''],
    ['City / Province', formData.get('city') || ''],
    ['Interested in', formData.get('interest') || ''],
    ['Number of dancers', formData.get('dancers') || ''],
    ['Dancer level', formData.get('level') || ''],
    ['Preferred date or timeframe', formData.get('date') || ''],
    ['Message / details', formData.get('message') || ''],
  ];

  return rows.map(([label, value]) => `${label}: ${value}`).join('\n');
}

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const booking = translations[currentLanguage].booking;
  const subject = encodeURIComponent(booking.subject);
  const body = encodeURIComponent(toMailtoBody(formData));
  window.location.href = `mailto:jamie@visiondance.ca?subject=${subject}&body=${body}`;
});

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

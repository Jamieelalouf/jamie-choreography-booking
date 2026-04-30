const serviceSelect = document.getElementById('serviceType');
const dancerInput = document.getElementById('dancerCount');
const estimateBtn = document.getElementById('estimateBtn');
const estimateOutput = document.getElementById('estimateOutput');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
const siteHeader = document.querySelector('.site-header');
const languageButtons = document.querySelectorAll('.lang-btn');
const bookingEmail = document.getElementById('bookingEmail');
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
    pageTitle: 'Book Jamie | Competitive Choreography & Workshops',
    pageDescription: 'Book Jamie for competitive choreography and dance workshops for your studio.',
    nav: { menu: 'Menu', about: 'About', why: 'Why Book Me', rates: 'Rates', workshops: 'Workshops', booking: 'Booking' },
    hero: {
      kicker: 'Competitive choreography + studio workshops',
      headline: 'Build routines that',
      accent: 'own the stage.',
      body: 'Jamie partners with competitive studios to craft sharp, high-impact hip-hop choreography, level up performance quality, and run rehearsals with clear, pro-level structure.',
      ctaQuote: 'Request a quote',
      ctaRates: 'See rates',
      frame: 'Premium choreography direction',
    },
    gallery: {
      title: 'Gallery',
      intro: 'Replace with rehearsal and stage photography from your studio collaborations.',
      featuredTitle: 'Featured Rehearsal Session',
      stageTitle: 'Competition Stage Moment',
      workshopTitle: 'Workshop Team Training',
      note: 'Replace with rehearsal photo',
    },
    about: {
      title: 'About Jamie',
      body1: 'Jamie is a Montreal-based professional hip-hop dancer and choreographer focused on competitive teams. He has been a hip-hop dancer since childhood and builds routines that look premium on stage while staying practical for real studio rehearsal timelines.',
      body2: 'As the founder of VISION Dance Camp, Jamie brings both creative direction and operational clarity, helping studio owners, directors, and dancers align around a stronger final result.',
    },
    proof: { 1: 'Professional dancer', 2: 'Founder of VISION Dance Camp', 3: 'Competitive choreography', 4: 'Studio workshops' },
    why: {
      title: 'Why book me',
      card1: 'Competitive-ready choreography',
      card2: 'Musicality + performance coaching',
      card3: 'Clear rehearsal structure',
      card4: 'Studio-friendly communication',
      card5: 'Dancers leave sharper',
    },
    rates: {
      title: 'Choreography rates',
      intro: 'Custom quotes are available for your exact needs.',
      solo: 'Solo choreography $750',
      duo: 'Duo choreography $900',
      trio: 'Trio choreography $1,050',
      small: 'Small group, 4–9 dancers $1,200 base + $75/dancer',
      smallBadge: 'Most popular',
      large: 'Large group, 10–19 dancers $1,500 base + $60/dancer',
      largeBadge: 'Best for competitive teams',
      line: 'Line/production, 20+ dancers Custom quote, usually $2,500+',
    },
    calc: {
      title: 'Premium quote tool',
      body: 'Select a service and dancer count for a fast estimate. 20+ dancers returns custom quote messaging.',
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
      title: 'Workshops',
      intro: 'Built for studios wanting cleaner execution, stronger performance quality, and practical coaching frameworks.',
      card1Title: '1-hour workshop $350/hour',
      card1Body: 'Best for focused musicality, texture, and performance sessions with one team.',
      card2Title: '3+ hour studio intensive discounted package available',
      card2Body: 'Best for studios running multi-team development blocks in one day.',
      card3Title: 'Competitive team coaching custom quote',
      card3Body: 'Best for comp teams preparing full sets, transitions, and stage strategy.',
      cta: 'Request a quote',
    },
    booking: {
      title: 'Booking inquiry',
      body: 'Ready to schedule choreography or workshops for your studio season?',
      note: 'Include: Studio name, City, Number of dancers, Service needed, Ideal dates.',
      cta: 'Email Jamie',
      subject: 'Booking Inquiry for Jamie',
      bodyTemplate: 'Hi Jamie,\n\nStudio name:\nCity:\nNumber of dancers:\nService needed:\nIdeal dates:\nAnything else:\n',
    },
    faq: {
      title: 'FAQ',
      q1: 'Do you offer custom quotes?',
      a1: 'Yes. Custom quotes are available for all projects.',
      q2: 'What affects pricing?',
      a2: 'Group size, routine complexity, timeline, and rehearsal format.',
      q3: 'Do you travel?',
      a3: 'Yes. Travel is available based on schedule and location.',
      q4: 'How do we start?',
      a4: 'Email your studio details, goals, dancer count, and target dates to begin.',
      q5: 'Can you coach existing choreography?',
      a5: 'Yes. Coaching sessions can refine existing choreography for cleaner execution and stronger performance.',
    },
  },
  fr: {
    pageTitle: 'Réserver Jamie | Chorégraphie compétitive et ateliers',
    pageDescription: 'Réservez Jamie pour la chorégraphie compétitive et des ateliers de danse pour votre studio.',
    nav: { menu: 'Menu', about: 'À propos', why: 'Pourquoi me réserver', rates: 'Tarifs', workshops: 'Ateliers', booking: 'Réservation' },
    hero: {
      kicker: 'Chorégraphie compétitive + ateliers en studio',
      headline: 'Créez des routines qui',
      accent: 'dominent la scène.',
      body: 'Jamie collabore avec des studios compétitifs pour créer des chorégraphies hip-hop précises et percutantes, hausser la qualité de performance et mener les répétitions avec une structure pro claire.',
      ctaQuote: 'Demander un devis',
      ctaRates: 'Voir les tarifs',
      frame: 'Direction chorégraphique premium',
    },
    gallery: {
      title: 'Galerie',
      intro: 'À remplacer par des photos de répétition et de scène de vos collaborations en studio.',
      featuredTitle: 'Session de répétition en vedette',
      stageTitle: 'Moment sur scène en compétition',
      workshopTitle: 'Entraînement d’équipe en atelier',
      note: 'À remplacer par une photo de répétition',
    },
    about: {
      title: 'À propos de Jamie',
      body1: 'Jamie est un danseur et chorégraphe hip-hop professionnel basé à Montréal, axé sur les équipes compétitives. Il danse le hip-hop depuis l’enfance et crée des routines premium sur scène, tout en restant réalistes pour les vrais horaires de répétition en studio.',
      body2: 'Fondateur de VISION Dance Camp, Jamie combine direction créative et clarté opérationnelle pour aider les propriétaires de studio, les directions et les danseurs/danseuses à livrer un résultat final plus solide.',
    },
    proof: { 1: 'Danseur professionnel', 2: 'Fondateur de VISION Dance Camp', 3: 'Chorégraphie compétitive', 4: 'Ateliers en studio' },
    why: {
      title: 'Pourquoi me réserver',
      card1: 'Chorégraphie prête pour la compétition',
      card2: 'Musicalité + coaching de performance',
      card3: 'Structure de répétition claire',
      card4: 'Communication efficace avec les studios',
      card5: 'Des danseurs/danseuses plus solides',
    },
    rates: {
      title: 'Tarifs de chorégraphie',
      intro: 'Des devis personnalisés sont disponibles selon vos besoins précis.',
      solo: 'Chorégraphie solo $750',
      duo: 'Chorégraphie duo $900',
      trio: 'Chorégraphie trio $1,050',
      small: 'Petit groupe, 4–9 danseurs/danseuses $1,200 de base + $75/danseur',
      smallBadge: 'Le plus populaire',
      large: 'Grand groupe, 10–19 danseurs/danseuses $1,500 de base + $60/danseur',
      largeBadge: 'Idéal pour les équipes compétitives',
      line: 'Ligne/production, 20+ danseurs/danseuses Devis personnalisé, habituellement $2,500+',
    },
    calc: {
      title: 'Outil de devis premium',
      body: 'Choisissez un service et le nombre de danseurs/danseuses pour une estimation rapide. 20+ danseurs/danseuses affiche un message de devis personnalisé.',
      serviceLabel: 'Type de service',
      dancerLabel: 'Nombre de danseurs/danseuses',
      optionSolo: 'Solo',
      optionDuo: 'Duo',
      optionTrio: 'Trio',
      optionSmall: 'Petit groupe (4–9)',
      optionLarge: 'Grand groupe (10–19)',
      optionLine: 'Ligne / production (20+)',
      button: 'Calculer',
      initial: 'Estimation : —',
      invalidDancers: 'Veuillez entrer un nombre valide de danseurs/danseuses.',
      customLarge: 'Devis personnalisé, habituellement $2,500+ pour 20+ danseurs/danseuses.',
      estimatedRate: 'Tarif estimé',
      baseLabel: 'de base',
      perDancerLabel: 'danseur',
      smallRange: 'Le petit groupe est prévu pour 4 à 9 danseurs/danseuses.',
      largeRange: 'Le grand groupe est prévu pour 10 à 19 danseurs/danseuses.',
      customAvailable: 'Des devis personnalisés sont disponibles.',
    },
    workshops: {
      title: 'Ateliers',
      intro: 'Conçus pour les studios qui veulent une exécution plus propre, une meilleure qualité de performance et des cadres de coaching concrets.',
      card1Title: 'Atelier de 1 heure $350/heure',
      card1Body: 'Idéal pour des sessions ciblées en musicalité, texture et performance avec une équipe.',
      card2Title: 'Intensif studio de 3+ heures, forfait réduit disponible',
      card2Body: 'Idéal pour les studios qui enchaînent plusieurs blocs de développement d’équipes dans une même journée.',
      card3Title: 'Coaching d’équipe compétitive sur devis personnalisé',
      card3Body: 'Idéal pour les équipes de compétition qui préparent des sets complets, des transitions et la stratégie de scène.',
      cta: 'Demander un devis',
    },
    booking: {
      title: 'Demande de réservation',
      body: 'Prêt à planifier la chorégraphie ou des ateliers pour la saison de votre studio?',
      note: 'Inclure : Nom du studio, Ville, Nombre de danseurs/danseuses, Service souhaité, Dates idéales.',
      cta: 'Écrire à Jamie',
      subject: 'Demande de réservation pour Jamie',
      bodyTemplate: 'Bonjour Jamie,\n\nNom du studio :\nVille :\nNombre de danseurs/danseuses :\nService souhaité :\nDates idéales :\nAutres détails :\n',
    },
    faq: {
      title: 'FAQ',
      q1: 'Offres-tu des devis personnalisés?',
      a1: 'Oui. Des devis personnalisés sont disponibles pour tous les projets.',
      q2: 'Qu’est-ce qui influence les tarifs?',
      a2: 'La taille du groupe, la complexité de la routine, l’échéancier et le format des répétitions.',
      q3: 'Te déplaces-tu?',
      a3: 'Oui. Les déplacements sont possibles selon l’horaire et la localisation.',
      q4: 'Comment commence-t-on?',
      a4: 'Envoyez les infos de votre studio, vos objectifs, le nombre de danseurs/danseuses et vos dates cibles pour démarrer.',
      q5: 'Peux-tu coacher une chorégraphie existante?',
      a5: 'Oui. Les sessions de coaching peuvent raffiner une chorégraphie existante pour une exécution plus propre et une meilleure performance.',
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

  if (!Number.isFinite(dancers) || dancers < 1) {
    return calc.invalidDancers;
  }

  if (service === 'line' || dancers >= 20) {
    return calc.customLarge;
  }

  if (service === 'solo') return `${calc.estimatedRate}: ${formatCurrency(pricing.solo)}`;
  if (service === 'duo') return `${calc.estimatedRate}: ${formatCurrency(pricing.duo)}`;
  if (service === 'trio') return `${calc.estimatedRate}: ${formatCurrency(pricing.trio)}`;

  if (service === 'small') {
    if (dancers < 4 || dancers > 9) {
      return calc.smallRange;
    }
    const total = pricing.smallBase + dancers * pricing.smallPerDancer;
    return `${calc.estimatedRate}: ${formatCurrency(total)} (${formatCurrency(pricing.smallBase)} ${calc.baseLabel} + ${formatCurrency(pricing.smallPerDancer)}/${calc.perDancerLabel})`;
  }

  if (service === 'large') {
    if (dancers < 10 || dancers > 19) {
      return calc.largeRange;
    }
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
  const booking = translations[currentLanguage].booking;
  const subject = encodeURIComponent(booking.subject);
  const body = encodeURIComponent(booking.bodyTemplate);
  bookingEmail.href = `mailto:jameselalouf@gmail.com?subject=${subject}&body=${body}`;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = key ? t(key) : undefined;
    if (typeof value === 'string') el.textContent = value;
  });

  document.title = translations[currentLanguage].pageTitle;
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', translations[currentLanguage].pageDescription);
  }

  languageButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === currentLanguage);
  });

  setBookingMailto();
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

const navAnchors = document.querySelectorAll('.nav-links a');
const sections = [...navAnchors].map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

if (sections.length) {
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
    { threshold: 0.5 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
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
}

const faqItems = document.querySelectorAll('[data-accordion-item]');
faqItems.forEach((item) => {
  const trigger = item.querySelector('[data-accordion-trigger]');
  trigger?.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

window.addEventListener('scroll', () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle('scrolled', window.scrollY > 12);
});

const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('pointermove', (event) => {
  if (!heroVisual || window.innerWidth < 920) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 6;
  const y = (event.clientY / window.innerHeight - 0.5) * 6;
  heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});

applyTranslations();

export { getEstimate, translations };

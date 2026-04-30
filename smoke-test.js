const fs = require('fs');
const path = require('path');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const htmlPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'styles.css');
const jsPath = path.join(__dirname, 'app.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

assert(html.includes('class="lang-toggle"'), 'Language toggle missing from nav.');
assert(html.includes('data-lang="en"') && html.includes('data-lang="fr"'), 'Language toggle buttons for EN/FR missing.');
assert(html.includes('data-i18n='), 'HTML must include data-i18n attributes.');

assert(js.includes('const translations ='), 'Translations object missing in app.js.');
assert(js.includes('fr:'), 'French translation namespace missing in app.js.');

['Chorégraphie solo $750', 'Demander un devis', 'studios compétitifs', 'Devis personnalisé'].forEach((text) => {
  assert(js.includes(text), `Missing French string in app.js: ${text}`);
});

const englishPricingStrings = [
  'Solo choreography $750',
  'Duo choreography $900',
  'Trio choreography $1,050',
  'Small group, 4–9 dancers $1,200 base + $75/dancer',
  'Large group, 10–19 dancers $1,500 base + $60/dancer',
  'Line/production, 20+ dancers Custom quote, usually $2,500+',
  '1-hour workshop $350/hour',
];
englishPricingStrings.forEach((text) => assert(js.includes(text), `Missing English pricing string: ${text}`));

const frenchPricingStrings = [
  'Chorégraphie solo $750',
  'Chorégraphie duo $900',
  'Chorégraphie trio $1,050',
  'Petit groupe, 4–9 danseurs/danseuses $1,200 de base + $75/danseur',
  'Grand groupe, 10–19 danseurs/danseuses $1,500 de base + $60/danseur',
  'Ligne/production, 20+ danseurs/danseuses Devis personnalisé, habituellement $2,500+',
  'Atelier de 1 heure $350/heure',
];
frenchPricingStrings.forEach((text) => assert(js.includes(text), `Missing French pricing string: ${text}`));

assert(html.includes('data-accordion-item'), 'Accordion item data attributes missing.');
assert(html.includes('data-accordion-trigger'), 'Accordion trigger data attributes missing.');
assert(html.includes('data-accordion-panel'), 'Accordion panel data attributes missing.');
assert(html.includes('id="serviceType"') && html.includes('id="dancerCount"') && html.includes('id="estimateBtn"'), 'Calculator controls missing.');

assert(js.includes('IntersectionObserver'), 'IntersectionObserver/reveal logic missing in app.js.');
assert(js.includes('reveal'), 'Reveal motion hooks missing in app.js.');
assert(js.includes("baseLabel: 'de base'") && js.includes("perDancerLabel: 'danseur'"), 'French calculator base/per-dancer labels missing.');

assert(!/https?:\/\//i.test(html), 'HTML should not include external CDN/HTTP URLs.');
assert(!/https?:\/\//i.test(css), 'CSS should not include external CDN/HTTP URLs.');
assert(!/https?:\/\//i.test(js), 'JS should not include external CDN/HTTP URLs.');

js = js.replace(/^\s*export\s*\{[^}]*\};?\s*$/gm, '');

const fakeElement = {
  value: '8',
  textContent: '',
  dataset: {},
  classList: {
    toggle: () => false,
    remove: () => {},
    add: () => {},
  },
  setAttribute: () => {},
  addEventListener: () => {},
  querySelectorAll: () => [],
  querySelector: () => fakeElement,
  getAttribute: () => '#about',
  style: {},
};

const localStorageStore = {};
const context = {
  Intl,
  Number,
  localStorage: {
    getItem: (key) => localStorageStore[key] || null,
    setItem: (key, value) => {
      localStorageStore[key] = String(value);
    },
  },
  window: {
    addEventListener: () => {},
    setTimeout: (fn) => fn(),
    innerWidth: 1200,
    innerHeight: 900,
    scrollY: 0,
  },
  document: {
    title: '',
    documentElement: { lang: 'en' },
    getElementById: () => fakeElement,
    querySelector: () => fakeElement,
    querySelectorAll: () => [],
  },
  IntersectionObserver: function () {
    this.observe = () => {};
    this.unobserve = () => {};
  },
};

const script = new vm.Script(js, { filename: 'app.js' });
script.runInNewContext(context);

console.log('Smoke tests passed.');

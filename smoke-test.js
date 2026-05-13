const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = __dirname;
const requiredFiles = [
  'index.html',
  'styles.css',
  'app.js',
  'smoke-test.js',
  path.join('assets', 'jamie-portrait.jpg'),
  path.join('assets', 'vision-labs-sample-workbook.pdf'),
];

requiredFiles.forEach((rel) => {
  const full = path.join(root, rel);
  assert(fs.existsSync(full), `Missing required file: ${rel}`);
});

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const personalInstagramUrl = 'https://www.instagram.com/jamieelalouf/';
const instagramUrl1 = 'https://www.instagram.com/p/DXXwNOaj_-1/?hl=en';
const instagramUrl2 = 'https://www.instagram.com/p/DXPmW03jrC1/?hl=en&img_index=3';

const parseCheck = spawnSync(process.execPath, ['--check', path.join(root, 'app.js')], { encoding: 'utf8' });
assert(parseCheck.status === 0, `app.js failed parse check: ${parseCheck.stderr || parseCheck.stdout}`);

['id="services"', 'id="rates"', 'id="workshops"', 'id="vision-labs"', 'id="booking"', 'href="assets/vision-labs-sample-workbook.pdf?v=20260513-new"'].forEach((needle) => {
  assert(html.includes(needle), `index.html missing required marker: ${needle}`);
});

[personalInstagramUrl, instagramUrl1, instagramUrl2].forEach((url) => {
  assert(html.includes(url), `index.html missing required Instagram URL: ${url}`);
});

['WORKBOOK_LINK_HERE'].forEach((needle) => {
  assert(!html.includes(needle), `Placeholder must be absent from index.html: ${needle}`);
  assert(!js.includes(needle), `Placeholder must be absent from app.js: ${needle}`);
  assert(!css.includes(needle), `Placeholder must be absent from styles.css: ${needle}`);
});

[
  'Workshops.',
  'Choreography',
  'Dancer development.',
].forEach((text) => {
  assert(html.includes(text), `Hero copy missing: ${text}`);
});
assert(css.includes('.hero-line-tight::after') && css.includes('content: "."'), 'Hero punctuation lock style is missing from styles.css.');

const removedHeroOverlayTexts = [
  'Professional dancer · Choreographer · Founder of VISION',
  'Studio-ready choreography + dancer development',
];

removedHeroOverlayTexts.forEach((text) => {
  assert(!html.includes(text), `Removed hero overlay text found in index.html: ${text}`);
  assert(!js.includes(text), `Removed hero overlay text found in app.js: ${text}`);
  assert(!css.includes(text), `Removed hero overlay text found in styles.css: ${text}`);
});
assert(
  html.includes('data-i18n="hero.instagramLabel"') || html.includes('@jamieelalouf') || html.includes('Instagram @jamieelalouf'),
  'Hero Instagram badge marker/text is missing from index.html.'
);
assert(js.includes("instagramLabel: '@jamieelalouf'"), "hero.instagramLabel translation '@jamieelalouf' is missing from app.js.");
assert(!html.includes('Follow @jamieelalouf'), 'Old English hero Instagram badge text must be absent from index.html.');
assert(!html.includes('Suivre @jamieelalouf'), 'Old French hero Instagram badge text must be absent from index.html.');
assert(!js.includes('Follow @jamieelalouf'), 'Old English hero Instagram badge text must be absent from app.js.');
assert(!js.includes('Suivre @jamieelalouf'), 'Old French hero Instagram badge text must be absent from app.js.');

const directEmailCtaEn = 'Email me here';
const directEmailCtaFr = 'Écrivez-moi ici';
assert(html.includes(directEmailCtaEn), 'English booking email CTA is missing from index.html.');
assert(js.includes(`topCta: '${directEmailCtaEn}'`), 'English booking top CTA translation is missing from app.js.');
assert(js.includes(`topCta: '${directEmailCtaFr}'`), 'French booking top CTA translation is missing from app.js.');
assert(html.includes('href="mailto:jamie@visiondance.ca"'), 'Booking mailto link is missing from index.html.');
assert(!html.includes('id="booking-form"'), 'Booking form should be removed from index.html.');
assert(!html.includes('<form'), 'Booking section should not include a questionnaire form.');
assert(!js.includes("document.getElementById('booking-form')"), 'booking-form DOM lookup should be removed from app.js.');
assert(!js.includes("addEventListener('submit'"), 'Booking submit handler should be removed from app.js.');
assert(!js.includes('function toMailtoBody'), 'Questionnaire-to-mailto logic should be removed from app.js.');
assert(!js.includes('directEmailLine:'), 'Legacy booking directEmailLine translation key should be removed from app.js.');
assert(!js.includes('directEmail:'), 'Legacy booking directEmail translation key should be removed from app.js.');

const bookingSectionMatch = html.match(/<section[^>]*id="booking"[\s\S]*?<\/section>/);
assert(bookingSectionMatch, 'Could not parse #booking section from index.html.');
const bookingSectionHtml = bookingSectionMatch[0];
const bookingMailtoMatches = bookingSectionHtml.match(/href="mailto:jamie@visiondance\.ca"/g) || [];
assert(bookingMailtoMatches.length === 1, 'Booking section must contain exactly one mailto:jamie@visiondance.ca link.');
assert(!bookingSectionHtml.includes('<form'), 'Booking section should not contain any form markup.');

assert(!html.includes('id="process"'), 'Process section should be removed.');
assert(!html.includes('How booking works'), '"How booking works" should be absent.');
assert(!html.includes('Why studios book Jamie'), '"Why studios book Jamie" should be absent.');

const workshopsIndex = html.indexOf('id="workshops"');
const labsIndex = html.indexOf('id="vision-labs"');
const bookingIndex = html.indexOf('id="booking"');
assert(workshopsIndex !== -1, 'Could not find workshops section.');
assert(labsIndex !== -1, 'Could not find vision-labs section.');
assert(bookingIndex !== -1, 'Could not find booking section.');
assert(workshopsIndex < labsIndex && labsIndex < bookingIndex, 'VISION Labs must appear after Workshops and before Booking in index.html.');

const requiredRates = [
  '$750',
  '$900',
  '$1,050',
  '$1,200 base + $75/dancer',
  '$1,500 base + $60/dancer',
  '$2,500+',
  '$300/hour',
];

requiredRates.forEach((rate) => {
  assert(html.includes(rate) || js.includes(rate), `Missing required rate string: ${rate}`);
});

const forbiddenStrings = [
  'jameselalouf@gmail.com',
  '$350/hour',
  '$350/heure',
];

forbiddenStrings.forEach((text) => {
  assert(!html.includes(text), `Forbidden legacy string found in index.html: ${text}`);
  assert(!js.includes(text), `Forbidden legacy string found in app.js: ${text}`);
  assert(!css.includes(text), `Forbidden legacy string found in styles.css: ${text}`);
});

const wrongBrandVisibleStrings = [
  'Vision Labs',
  'In-Studio Vision Labs',
  'Vision Labs training',
  'Vision Labs-style',
];

wrongBrandVisibleStrings.forEach((text) => {
  assert(!html.includes(text), `Wrong brand casing found in index.html visible content: ${text}`);
  assert(!js.includes(text), `Wrong brand casing found in app.js visible translations/content: ${text}`);
});

[
  'Name',
  'Studio name',
  'City / Province',
  'What are you interested in?',
  'Preferred date or timeframe',
  'Message / details',
].forEach((text) => {
  assert(!html.includes(text), `Booking questionnaire copy should be absent from index.html: ${text}`);
});

assert(html.includes('data-lang="en"') && html.includes('data-lang="fr"'), 'EN/FR language toggle buttons are missing.');
assert(js.includes('const translations =') && js.includes('fr:'), 'Translations object must include fr namespace.');
assert(js.includes('document.documentElement.lang = currentLanguage'), 'Language application must update document.documentElement.lang.');
assert(js.includes("localStorage.getItem('jamie-language')") && js.includes("localStorage.setItem('jamie-language'"), 'Language persistence in localStorage is missing.');
assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'styles.css must include prefers-reduced-motion guardrails.');
assert(js.includes("document.documentElement.classList.add('js-enabled')"), 'app.js must add js-enabled to <html>.');
assert(css.includes('html.js-enabled .reveal:not(.in-view)'), 'styles.css must guard reveal hidden state behind html.js-enabled.');
assert(
  css.includes('@keyframes heroLineIn') || css.includes('@keyframes heroRiseIn') || css.includes('@keyframes heroFloat'),
  'styles.css must include at least one hero animation keyframes marker.'
);
if (css.includes('@keyframes heroFloat')) {
  const heroFloatBlockMatch = css.match(/@keyframes\s+heroFloat\s*{[\s\S]*?}/);
  assert(heroFloatBlockMatch, 'Unable to read @keyframes heroFloat block from styles.css.');
  assert(!heroFloatBlockMatch[0].includes('rotate('), '@keyframes heroFloat must not include rotation.');
}

assert(html.includes('assets/jamie-portrait.jpg'), 'index.html must reference assets/jamie-portrait.jpg.');

const bannedPhrases = [
  'unlock your potential',
  'transform your dancers overnight',
  'revolutionary',
  'game-changing',
];

const combined = `${html}\n${css}\n${js}`.toLowerCase();
bannedPhrases.forEach((phrase) => {
  assert(!combined.includes(phrase), `Banned phrase found: "${phrase}"`);
});

const externalUrlRegex = /https?:\/\/[^\s"'<>)]*/gi;
const htmlExternalUrls = html.match(externalUrlRegex) || [];
const allowedExternalUrls = new Set([personalInstagramUrl, instagramUrl1, instagramUrl2]);
const unexpectedHtmlExternalUrls = htmlExternalUrls.filter((url) => !allowedExternalUrls.has(url));
assert(unexpectedHtmlExternalUrls.length === 0, `Unexpected external http(s) URL found in index.html: ${unexpectedHtmlExternalUrls.join(', ')}`);
assert(htmlExternalUrls.length === allowedExternalUrls.size, 'index.html must include exactly the three allowed Instagram URLs and no other external URLs.');
assert(!externalUrlRegex.test(css), 'External http(s) URL found in styles.css.');
assert(!externalUrlRegex.test(js), 'External http(s) URL found in app.js.');

console.log('Smoke tests passed.');

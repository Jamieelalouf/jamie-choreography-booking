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
];

requiredFiles.forEach((rel) => {
  const full = path.join(root, rel);
  assert(fs.existsSync(full), `Missing required file: ${rel}`);
});

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

const parseCheck = spawnSync(process.execPath, ['--check', path.join(root, 'app.js')], { encoding: 'utf8' });
assert(parseCheck.status === 0, `app.js failed parse check: ${parseCheck.stderr || parseCheck.stdout}`);

['id="services"', 'id="rates"', 'id="workshops"', 'id="vision-labs"', 'id="booking"', 'href="WORKBOOK_LINK_HERE"'].forEach((needle) => {
  assert(html.includes(needle), `index.html missing required marker: ${needle}`);
});

[
  'Train sharper.',
  'Perform stronger.',
  'Compete different.',
].forEach((text) => {
  assert(html.includes(text), `Hero copy missing: ${text}`);
});

assert(!html.includes('id="process"'), 'Process section should be removed.');
assert(!html.includes('How booking works'), '"How booking works" should be absent.');
assert(!html.includes('Why studios book Jamie'), '"Why studios book Jamie" should be absent.');

const workshopsIndex = html.indexOf('id="workshops"');
const labsIndex = html.indexOf('id="vision-labs"');
const bookingIndex = html.indexOf('id="booking"');
assert(workshopsIndex !== -1, 'Could not find workshops section.');
assert(labsIndex !== -1, 'Could not find vision-labs section.');
assert(bookingIndex !== -1, 'Could not find booking section.');
assert(workshopsIndex < labsIndex && labsIndex < bookingIndex, 'Vision Labs must appear after Workshops and before Booking in index.html.');

const requiredRates = [
  '$750',
  '$900',
  '$1,050',
  '$1,200 base + $75/dancer',
  '$1,500 base + $60/dancer',
  '$2,500+',
  '$350/hour',
];

requiredRates.forEach((rate) => {
  assert(html.includes(rate) || js.includes(rate), `Missing required rate string: ${rate}`);
});

const bookingStrings = [
  'Name',
  'Studio name',
  'Email',
  'City / Province',
  'Competitive choreography',
  'Studio workshop',
  'Team coaching',
  'In-Studio Vision Labs',
  'Not sure yet',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Competitive team',
  'Mixed levels',
  'Preferred date or timeframe',
  'Message / details',
];

bookingStrings.forEach((item) => {
  assert(html.includes(item), `Booking form text/option missing: ${item}`);
});

assert(html.includes('data-lang="en"') && html.includes('data-lang="fr"'), 'EN/FR language toggle buttons are missing.');
assert(js.includes('const translations =') && js.includes('fr:'), 'Translations object must include fr namespace.');
assert(js.includes('document.documentElement.lang = currentLanguage'), 'Language application must update document.documentElement.lang.');
assert(js.includes("localStorage.getItem('jamie-language')") && js.includes("localStorage.setItem('jamie-language'"), 'Language persistence in localStorage is missing.');

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

const externalUrlRegex = /https?:\/\//i;
assert(!externalUrlRegex.test(html), 'External http(s) URL found in index.html.');
assert(!externalUrlRegex.test(css), 'External http(s) URL found in styles.css.');
assert(!externalUrlRegex.test(js), 'External http(s) URL found in app.js.');

console.log('Smoke tests passed.');

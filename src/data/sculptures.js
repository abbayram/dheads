const names = [
  ['kinkdick', 'Kinkdick'],
  ['the-dick-2', 'The Dick 2'],
  ['balerina-dicktator', 'Balerina Dicktator'],
  ['kapitalfehler', 'Kapitalfehler'],
  ['morning-glory', 'Morning Glory'],
  ['vater-staat', 'Vater Staat'],
  ['brain', 'Brain'],
  ['ego-trip', 'Ego Trip'],
  ['besserwisser', 'Besserwisser'],
  ['saint-maybe', 'Saint Maybe'],
  ['statua-twerk', 'Statua Twerk'],
  ['steuerklasse-eins', 'Steuerklasse I'],
  ['no-comment', 'No Comment'],
  ['late-checkout', 'Late Checkout'],
  ['good-boy', 'Good Boy'],
  ['minor-problem', 'Minor Problem'],
  ['public-figure', 'Public Figure'],
  ['deep-thought', 'Deep Thought'],
  ['nothing-personal', 'Nothing Personal'],
  ['herr-ober', 'Herr Ober'],
  ['small-talk', 'Small Talk'],
  ['private-property', 'Private Property'],
  ['cold-feet', 'Cold Feet'],
  ['main-character', 'Main Character'],
  ['kunstfehler', 'Kunstfehler'],
  ['trust-fund', 'Trust Fund'],
  ['soft-launch', 'Soft Launch'],
  ['bad-timing', 'Bad Timing'],
  ['civil-servant', 'Civil Servant'],
  ['last-warning', 'Last Warning']
];

const palettes = [
  ['#ff9ede', '#f6edfc'],
  ['#d8ff72', '#2b2b2b'],
  ['#8ec5ff', '#f6edfc'],
  ['#ff704d', '#ffe6dc'],
  ['#c0a5ff', '#f6edfc'],
  ['#ffd84d', '#2b2b2b']
];

const collections = ['PUBLIC AFFAIRS', 'SOFT POWER', 'PRIVATE MATTERS', 'OFFICE HOURS'];

const summaries = [
  {
    de: 'Steht im Raum wie eine Meinung, nach der niemand gefragt hat.',
    en: 'Occupies the room like an opinion nobody asked for.'
  },
  {
    de: 'Sehr gute Haltung. Fragwürdige Absichten.',
    en: 'Excellent posture. Questionable intentions.'
  },
  {
    de: 'Für Regale mit zu viel Geschmack und zu wenig Scham.',
    en: 'For shelves with too much taste and not enough shame.'
  },
  {
    de: 'Eine kleine Autorität mit vollkommen unbegründetem Selbstvertrauen.',
    en: 'A small authority with entirely unearned confidence.'
  },
  {
    de: 'Sieht teuer aus. Benimmt sich nicht so.',
    en: 'Looks expensive. Does not behave accordingly.'
  },
  {
    de: 'Form, Farbe und eine bemerkenswert schlechte Ausrede.',
    en: 'Form, colour and a remarkably poor excuse.'
  },
  {
    de: 'Ein Denkmal für Dinge, die man besser nicht erklären sollte.',
    en: 'A monument to things best left unexplained.'
  },
  {
    de: 'Klein genug fürs Sideboard. Groß genug fürs Problem.',
    en: 'Small enough for the sideboard. Large enough for the problem.'
  },
  {
    de: 'Hat nichts zu beweisen und tut es trotzdem.',
    en: 'Has nothing to prove and does it anyway.'
  },
  {
    de: 'Zwischen Kultobjekt und schlechtem Einfluss.',
    en: 'Somewhere between cult object and bad influence.'
  }
];

const statements = [
  {
    de: 'Die Figur untersucht das merkwürdige Bedürfnis, Autorität sichtbar zu machen. Das Ergebnis steht jetzt da und wartet darauf, ernst genommen zu werden.',
    en: 'The figure studies the peculiar urge to make authority visible. It now stands there, waiting to be taken seriously.'
  },
  {
    de: 'Ein höfliches Objekt über Eitelkeit, Status und die dünne Linie zwischen Selbstbild und Selbstüberschätzung.',
    en: 'A polite object about vanity, status and the thin line between self-image and self-importance.'
  },
  {
    de: 'Die Oberfläche ist kontrolliert. Der Charakter nicht. Genau dort beginnt die Arbeit.',
    en: 'The surface is controlled. The character is not. That is precisely where the work begins.'
  },
  {
    de: 'Ein stilles Stück Berliner Diplomatie: freundlich im Ton, unverhandelbar in der Form.',
    en: 'A quiet piece of Berlin diplomacy: friendly in tone, non-negotiable in form.'
  },
  {
    de: 'Das Objekt behauptet nichts. Es steht nur auffällig nah an der Wahrheit.',
    en: 'The object makes no claims. It merely stands suspiciously close to the truth.'
  }
];

const materials = [
  {
    de: 'Pigmentiertes Kunstharz, Acryl, Klarlack',
    en: 'Pigmented resin, acrylic, clear coat'
  },
  {
    de: 'PLA, mineralische Grundierung, Acryl',
    en: 'PLA, mineral primer, acrylic'
  },
  {
    de: 'Mischtechnik, Kunstharz, Wachsfinish',
    en: 'Mixed media, resin, wax finish'
  }
];

const acquired = new Set([4, 9, 16, 23, 28]);
const held = new Set([13, 21]);

export const fallbackSculptures = names.map(([slug, title], index) => {
  const number = index + 1;
  const palette = palettes[index % palettes.length];
  const summary = summaries[index % summaries.length];
  const statement = statements[index % statements.length];
  const material = materials[index % materials.length];

  return {
    _id: `fallback-${number}`,
    slug,
    code: `DH-${String(number).padStart(3, '0')}`,
    title,
    year: 2024 + (index % 3),
    status: acquired.has(number) ? 'acquired' : held.has(number) ? 'held' : 'available',
    collection: collections[index % collections.length],
    summaryDe: summary.de,
    summaryEn: summary.en,
    statementDe: statement.de,
    statementEn: statement.en,
    materialDe: material.de,
    materialEn: material.en,
    dimensions: `${18 + (index % 5) * 2} × ${9 + (index % 4)} × ${8 + (index % 3)} cm`,
    colour: palette[0],
    accent: palette[1],
    variant: (index % 6) + 1,
    featured: [1, 2, 3, 7, 11, 18].includes(number),
    images: [],
    mainImage: null,
    modelUrl: {
      kinkdick: '/models/kinkdick.glb',
      'the-dick-2': '/models/the-dick-2.glb',
      'balerina-dicktator': '/models/balerina-dicktator.glb',
      brain: '/models/brain.glb',
      'statua-twerk': '/models/statua-twerk.glb'
    }[slug] || null
  };
});

export function sculptureBySlug(slug) {
  return fallbackSculptures.find((item) => item.slug === slug);
}

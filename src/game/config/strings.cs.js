// @ts-nocheck
export const STRINGS = {
  gameTitle: 'LOVEC UPÍRŮ',
  gameSubtitle: 'Venca Česnekáč & Hradní Byrokracie',
  acts: {
    1: 'Akt I: Zatuchlé předhradí a berňák',
    2: 'Akt II: Černá kuchyně a účtárna',
    3: 'Akt III: Zasedačka Krvavé a.s.'
  },
  friendlyFireQuotes: [
    '„Hrabě Drákula by zaplakal – upír právě prokousl krk vlastnímu kolegovi z účtárny!“',
    '„Tohle odbory neschválí! Upír napálil kolegu přímo mezi lopatky!“',
    '„Přátelská výpomoc po upířsku: jeden špičák do vlastních řad!“',
    '„Kdo jinému jámu kopá, ten kolegovi razítko na čelo pleskne!“',
    '„Pracovní úraz na noční směně! Venca se jen škodolibě chechtá pod fousy.“'
  ],
  collisionQuotes: [
    '„řach! Dvě palice zaduněly o sebe jak pivní soudky!“',
    '„Hradní zeď nepovolila, zato upírovi křuplo v kříži!“',
    '„Srážka v chodbě bez přednosti zprava!“'
  ],
  momentumQuotes: [
    '„MOMENTUM! Poslední pijavice padla v kombu – Venca popadl druhý dech a zkrátil cooldowny!“'
  ],
  tutorialHints: [
    'TIP 1 (Kroky): Klávesami A / D popojdeš o 1 pole. Do obsazeného pole se vejít nedá. Přes překážku skáče jen destička Hospodský přemet.',
    'TIP 2 (Otočení a Česnek): Klávesou W se Venca otočí čelem vzad. V Česnekovém oblaku je otočení ZDARMA (nestojí tah)!',
    'TIP 3 (Fronta a Kombo): Kliknutím na destičku (nebo klávesami 1–9) ji vložíš do Fronty (stojí 1 tah, pokud není Rychlovka). Mezerníkem (Space) odpálíš celou frontu najednou!',
    'TIP 4 (Záměry a Friendly Fire): Sleduj odpočet nad hlavami upírů a červeně označená pole. Když upíra poodstrčíš nebo otočíš stříkačkou, napálí při odpočtu 0 vlastního kumpána!'
  ]
};

/** Czech plural for a turn count: 1 tah, 2–4 tahy, 5+ tahů, 11–14 tahů. */
export function czechTurns(n) {
  const abs = Math.abs(Number(n) || 0);
  if (abs % 100 >= 11 && abs % 100 <= 14) return 'tahů';
  const d = abs % 10;
  if (d === 1) return 'tah';
  if (d >= 2 && d <= 4) return 'tahy';
  return 'tahů';
}

// @ts-nocheck
export const NARRATIVE_EVENTS = [
  {
    id: 'garlic_smuggler',
    title: 'Pašerák se sušeným česnekem',
    text: 'V průvanu pod schodištěm přešlapuje chlapík v promaštěném kabátě. „Pst, pane Venco! Mám tu pravý břeclavský paličák i trochu mešního vína ze sakristie. Co to bude?“',
    choices: [
      {
        label: 'Koupit věnec česneku a posilnit se (−12 dukátů, +3 HP)',
        condition: (run) => run.gold >= 12,
        effect: { goldDelta: -12, heal: 3, log: 'Venca schroupal tři stroužky česneku a cítí se jako zamlada (+3 HP).' }
      },
      {
        label: 'Vyměnit starou lahvičku za náhodný talisman (−15 dukátů)',
        condition: (run) => run.gold >= 15,
        effect: { goldDelta: -15, grantRandomTalisman: true, log: 'Pašerák vytáhl z kapsy podivuhodnou relikvii!' }
      },
      {
        label: 'Postrašit ho krucifixem a vybrat pokutu (+10 dukátů)',
        effect: { goldDelta: 10, log: 'Pašerák raději vysypal drobné, než by dostal křížem přes čepici (+10 dukátů).' }
      }
    ]
  },
  {
    id: 'vampire_tax_form',
    title: 'Zaprášené hradní skriptorium',
    text: 'U kamenného pultu dospává starý upíří písař. Na pergamenech jsou načrtnuté kletby krve a vedle leží měšec se stříbrňáky.',
    choices: [
      {
        label: 'Sebrat měšec a probodnout kletbu (+18 dukátů, ale písař tě škrábne drápem: −1 HP)',
        effect: { goldDelta: 18, damage: 1, log: 'Škrábanec od upířího drápu pálí (−1 HP), ale v kapse cinká 18 dukátů!' }
      },
      {
        label: 'Seřídit si opasek a vylepšit náhodnou destičku zdarma',
        effect: { upgradeRandomTile: true, log: 'Klid ve skriptoriu posloužil k vykování jedné destičky!' }
      },
      {
        label: 'Po špičkách odejít a odpočinout si ve stínu klenby (+2 HP)',
        effect: { heal: 2, log: 'Dvacet minut klidného oddechu v chladném stínu katakomb (+2 HP).' }
      }
    ]
  },
  {
    id: 'abandoned_barrel',
    title: 'Zapomenutý sud z klášterního pivovaru',
    text: 'Uprostřed klenuté síně stojí naražený soudek. Voní z něj poctivý ležák, ale kolem pípy jsou stopy od upířích špičáků.',
    choices: [
      {
        label: 'Natočit si poctivý tuplák (+4 HP)',
        effect: { heal: 4, log: 'Křenová pěna a svěcený chmel! Vencovi se vrátil elán (+4 HP).' }
      },
      {
        label: 'Prohledat dno sudu (získáš novou destičku do zásoby)',
        effect: { grantRandomTile: true, log: 'Za sudem ležel zapomenutý lovecký nástroj!' }
      },
      {
        label: 'Rozebrat mosazné obruče a prodat je (+14 dukátů)',
        effect: { goldDelta: 14, log: 'Mosazná pípa hodí ve výkupu pěkných 14 dukátů.' }
      }
    ]
  },
  {
    id: 'crypt_confessional',
    title: 'Vrzající zpovědnice v kryptě',
    text: 'Z dřevěné budky se ozývá šepot: „Otče, zhřešil jsem, místo krve jsem včera pil malinovou limonádu...“ Je to kající se upír-praktikant.',
    choices: [
      {
        label: 'Udělit mu rozhřešení výměnou za cenný talisman',
        effect: { grantRandomTalisman: true, log: 'Kající se upír ti podstrčil mřížkou rodinný talisman.' }
      },
      {
        label: 'Uložit mu pokání v dukátech (+16 dukátů)',
        effect: { goldDelta: 16, log: 'Upír vysázel 16 dukátů do kasičky na opravu střechy.' }
      },
      {
        label: 'Namočit kolík ve svěcené kropence (vylepší 1 destičku)',
        effect: { upgradeRandomTile: true, log: 'Svěcená voda ze zpovědnice posílila tvou výzbroj!' }
      }
    ]
  }
];

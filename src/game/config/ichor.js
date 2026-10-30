// @ts-nocheck
// Living flesh is red. Vampire ichor is blue. Plague, mold and mutants are green.

const VAMPIRES = new Set([
  'praktikant',
  'urednik',
  'elite_urednik',
  'ucetni_buffer',
  'netopyr',
  'upirske_prase',
  'upirka_cilka',
  'upiri_trpaslik',
  'hrabenka_amalie',
  'boss_sosak',
  'boss_dagmar',
  'boss_drakula'
]);

const MUTANTS = new Set([
  'sliz',
  'morak',
  'prase_mutant',
  'bazinny_sliz',
  'rytir_prizrak',
  'zombie_hynek',
  'kostlivec_fabian',
  'krysa_piskota',
  'morovy_felcar'
]);

export function ichorForKind(kind, entityType, name = '') {
  if (entityType === 'prop') return null;
  if (entityType === 'hero') return 'red';
  if (MUTANTS.has(kind)) return 'green';
  if (VAMPIRES.has(kind)) return 'blue';

  const blob = `${kind || ''} ${name || ''}`.toLowerCase();
  if (/upír|upir|vamp|netop|drák|drakula|sosák|sosak|dagmar/.test(blob)) return 'blue';
  if (/sliz|morov|zombie|mutant|plísn|plisn|breber|kostliv|krys|felčar|felcar|nebožt|nebozt/.test(blob)) return 'green';
  return 'red';
}

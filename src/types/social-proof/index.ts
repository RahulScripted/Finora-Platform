export type Brand = {
  name: string;
  /** inline SVG path(s) rendered inside a 0 0 24 24 viewBox */
  icon: string;
};

/** Minimal wordmark-style logos. Icons are simple geometric glyphs. */
export const brandsRowOne: Brand[] = [
  { name: 'Nebula', icon: 'M12 2a10 10 0 1 0 10 10A6 6 0 0 1 12 2z' },
  { name: 'Quanta', icon: 'M4 4h16v16H4z M9 9h6v6H9z' },
  { name: 'Vertex', icon: 'M12 2 22 20H2z' },
  { name: 'Lumen', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 7v10 M7 12h10' },
  { name: 'Flux', icon: 'M3 12h7l-3 8 11-12h-7l3-8z' },
];

export const brandsRowTwo: Brand[] = [
  { name: 'Orbit', icon: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M2 12h4 M18 12h4' },
  { name: 'Pulse', icon: 'M2 12h5l2-7 4 14 2-7h7' },
  { name: 'Mono', icon: 'M4 4h16v16H4z' },
  { name: 'Arc', icon: 'M4 20a8 8 0 0 1 16 0' },
  { name: 'Prism', icon: 'M12 3 3 20h18z M12 3v17' },
];

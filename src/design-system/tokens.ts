export const colors = {
  // Surfaces
  board: '#221B29',
  paper: '#F6F1E8',
  paperRaised: '#FCFAF4',
  paperSunken: '#EFE8DB',

  // Ink
  ink: '#2A2230',
  inkSoft: '#766C7E',
  inkFaint: '#A79DAE',
  line: 'rgba(42,34,48,0.10)',
  lineStrong: 'rgba(42,34,48,0.16)',

  // Accents - the two partners
  iris: '#5B47C9',
  irisDeep: '#46369F',
  irisTint: '#E9E4FA',
  irisGlow: 'rgba(91,71,201,0.16)',
  clay: '#C77F6E',
  clayDeep: '#A9604F',
  clayTint: '#F3E3DC',
  sage: '#6F8E69',
  sageTint: '#E2EADE',
  danger: '#C25B5B',
} as const;

export const typography = {
  serif: 'FrankRuhlLibre_400Regular',
  serifBold: 'FrankRuhlLibre_700Bold',
  serifBlack: 'FrankRuhlLibre_900Black',
  sans: 'Assistant_400Regular',
  sansMedium: 'Assistant_500Medium',
  sansSemiBold: 'Assistant_600SemiBold',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 14,
  md: 20,
  lg: 30,
} as const;

export const shadows = {
  xs: {
    shadowColor: '#2A2230',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  card: {
    shadowColor: '#2A2230',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.035,
    shadowRadius: 2,
    elevation: 2,
  },
  pop: {
    shadowColor: '#2A2230',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
} as const;

export const gradients = {
  paperLogin: [colors.paper, '#F1EAFB'] as const,
  paperVoice: ['#F1EAFB', '#F6EFF6', '#F3EAF7'] as const,
} as const;

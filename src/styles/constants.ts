export const BORDER_RADIUS = '8px';

export const COLORS = {
  primary: '#ffa001',
  secondary: '#339CFD',
  textSecondary: '#ffffff',
  textSiderPrimary: '#ffa001',
  textSiderSecondary: '#ffffff',
  tagColor: 'blue',
} as const;

export const LAYOUT = {
  mobile: {
    paddingVertical: '0.75rem',
    paddingHorizontal: '1rem',
    headerHeight: '4.25rem',
    headerPadding: '1rem',
  },
  desktop: {
    paddingVertical: '1.25rem',
    paddingHorizontal: '2.25rem',
    headerHeight: '5.625rem',
  },
} as const;

export const BREAKPOINTS = {
  xs: 360,
  sm: 568,
  md: 768,
  lg: 992,
  xl: 1280,
  xxl: 1920,
} as const;

const getMedia = <T extends number>(breakpoint: T): `(min-width: ${T}px)` => `(min-width: ${breakpoint}px)`;

export const media = {
  xs: getMedia(BREAKPOINTS.xs),
  sm: getMedia(BREAKPOINTS.sm),
  md: getMedia(BREAKPOINTS.md),
  lg: getMedia(BREAKPOINTS.lg),
  xl: getMedia(BREAKPOINTS.xl),
  xxl: getMedia(BREAKPOINTS.xxl),
} as const;

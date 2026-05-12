export const colors = {
  primary: {
    DEFAULT: '#1A1F4E',
    dark: '#0A0F2C',
    light: '#2A3080'
  },
  accent: {
    DEFAULT: '#4B5FD6',
    light: '#5B6FE6',
    muted: '#3A4EC4'
  },
  card: {
    DEFAULT: '#1E2761',
    light: '#252D70',
    dark: '#141940'
  },
  surface: '#2A3080',
  white: '#FFFFFF',
  text: {
    primary: '#FFFFFF',
    // secondary: '#A0A8D0',
    muted: '#6B7299'
  },
  gold: '#F5C542',
  success: '#4CAF50',
  error: '#EF4444',
  warning: '#F59E0B',
  pending: '#F59E0B',
  active: '#3B82F6',
  completed: '#4CAF50',
  cancelled: '#EF4444',
  divider: '#2A3080'
} as const;

export type AppColors = typeof colors;


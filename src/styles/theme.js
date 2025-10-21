export const theme = {
  colors: {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    secondary: '#7c3aed',
    accent: '#f59e0b',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceLight: '#334155',
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      muted: '#64748b'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      secondary: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      dark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      text: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
    }
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '5rem'
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.1)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 25px rgba(0,0,0,0.2)',
    xl: '0 20px 50px rgba(0,0,0,0.3)'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '50px'
  }
};

export default theme;
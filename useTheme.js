import { useEffect, useState } from 'react';

// Dark is the default: the site reads as an instrument screen. Light mode is
// there for anyone printing the page or reading it in direct sun.
export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}

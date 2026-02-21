import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to 'dark' to simulate the initial boot environment
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    // Strip all theme classes first
    root.classList.remove('light', 'dark', 'theme-dsecure');
    
    // Apply the active theme (light is the base default in index.css without classes)
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'theme-dsecure') {
      root.classList.add('theme-dsecure');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
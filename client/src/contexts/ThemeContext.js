import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [themeState, setThemeState] = useState([
    {
      isLightTheme: true,
      light: {
        syntax: '#555',
        ui: '#ddd',
        bg: '#eee'
      },
      dark: {
        syntax: '#ddd',
        ui: '#333',
        bg: '#555'
      }
    }
  ]);

  const toggleTheme = () => {
    setThemeState(themeState => ({
      themeState,
      isLightTheme: !themeState.isLightTheme
    }));
  };

  return (
    <ThemeContext.Provider value={{ ...themeState, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

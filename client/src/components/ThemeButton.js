import React, { useState } from 'react';
import styled from 'styled-components/macro';
const ThemeButton = ({ isDarkMode, toggleTheme }) => {
  const [themeButtonVisible, setThemeButtonVisible] = useState(false);

  return (
    <Button
      onClick={toggleTheme}
      onMouseEnter={() => setThemeButtonVisible(!themeButtonVisible)}
      onMouseLeave={() => setThemeButtonVisible(!themeButtonVisible)}
      isVisible={themeButtonVisible}
    >
      <span role="img" aria-label="theme icon">
        {isDarkMode ? '☀️' : '🌑'}
      </span>
    </Button>
  );
};

export default ThemeButton;

const Button = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  font-size: 20px;
  border: none;
  outline: 0 none;
  position: fixed;
  right: 0;
  bottom: 0;
  border-radius: 100px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 6px 6px 0;
  user-select: none;
  transition: 0.15s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0.33)};
  color: ${({ theme }) => theme.global.text};
  background-color: ${({ theme }) => theme.button.focus};
  &:hover {
    background-color: ${({ theme }) => theme.button.active};
  }
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`;

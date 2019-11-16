import React, { useState } from 'react';
import styled from 'styled-components/macro';

const ThemeButton = ({ isDarkMode, toggleTheme }) => {
  const [themeButtonVisible, setThemeButtonVisible] = useState(false);

  return (
    <Button
      onClick={toggleTheme}
      onMouseEnter={() => setThemeButtonVisible(true)}
      onMouseLeave={() => setThemeButtonVisible(false)}
      isVisible={themeButtonVisible}
    >
      <span role="img" aria-label="theme icon">
        {isDarkMode ? '🌚' : '🌞'}
      </span>
    </Button>
  );
};

export default ThemeButton;

const Button = styled.button`
  cursor: pointer;
  width: 65px;
  height: 65px;
  font-size: 20px;
  border: none;
  outline: 0 none;
  position: fixed;
  left: 0;
  bottom: 0;
  border-radius: 0px 100px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0 0 10px 10px;
  user-select: none;
  transition: 0.15s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  color: ${({ theme }) => theme.global.text};
  background-color: ${({ theme }) => theme.button.focus};
  &:hover {
    background-color: ${({ theme }) => theme.button.active};
  }
`;

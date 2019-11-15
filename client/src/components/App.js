import React, { useState } from 'react';
import List from './List/List';
import Form from './Form/Form';
import { hot } from 'react-hot-loader';
import styled, {
  createGlobalStyle,
  ThemeProvider
} from 'styled-components/macro';
import { DataContext } from '../contexts/dataContext';
import themeLight from '../themes/themeLight';
import themeDark from '../themes/themeDark';
import { useContextSelector } from 'use-context-selector';

// import Start from './Test/Start/Start';
// import Test from './Test/Test';

const App = () => {
  const dataStorage = useContextSelector(
    DataContext,
    state => state.dataStorage
  );

  const stored = localStorage.getItem('isDarkMode');
  const [isDarkMode, setIsDarkMode] = useState(
    stored === 'true' ? true : false
  );
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', !isDarkMode);
  };

  if (dataStorage) {
    console.log(dataStorage);
  }

  return (
    <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
      <GlobalStyle />
      <AppBox>
        {/* <Test /> */}
        <Navbar isAnimated={dataStorage ? true : false}>
          <Form />
          <ThemeButton onClick={toggleTheme}>
            <span role="img" aria-label="theme icon">
              {isDarkMode ? '🌚' : '🌞'}
            </span>
          </ThemeButton>
          {/* <Start isOpaque={dataStorage ? true : false} /> */}
        </Navbar>
        <Container isOpaque={dataStorage ? true : false}>
          <List />
        </Container>
      </AppBox>
    </ThemeProvider>
  );
};
export default hot(module)(App);

const AppBox = styled.div`
  height: 100vh;
  padding: 0 12px;
`;

const Navbar = styled.nav`
  position: relative;
  top: ${({ isAnimated }) => (isAnimated === false ? '50%' : '0%')};
  transform: ${({ isAnimated }) =>
    isAnimated === false ? 'translateY(-50%)' : 'none'};
  margin: auto;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 125px;
  transition: all 0.5s ease 0s;
  display: flex;
  flex-direction: column-reverse;
`;

const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  top: 0%;
  opacity: ${({ isOpaque }) => (isOpaque ? 1 : 0)};
  transition: opacity 0.5s ease 0.5s;
`;

const ThemeButton = styled.button`
  color: ${({ theme }) => theme.global.text};
  background-color: ${({ theme }) => theme.button.focus};
  position: absolute;
  right: 20px;
  width: 65px;
  height: 65px;
  font-size: 20px;
  border: none;
  padding: 0;
  border-radius: 8px;
  outline: 0 none;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.button.active};
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: ${({ theme }) => theme.global.background};
  color: ${({ theme }) => theme.global.text};
  transition: background-color .2s ease-out;
  }
`;

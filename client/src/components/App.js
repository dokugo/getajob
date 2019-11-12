import React from 'react';
import List from './List/List';
import Form from './Form/Form';
import { hot } from 'react-hot-loader';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { DataContext } from '../contexts/dataContext';
import { useContextSelector } from 'use-context-selector';
// import Start from './Test/Start/Start';
// import Test from './Test/Test';

const App = () => {
  // console.log('App re-render');

  const dataStorage = useContextSelector(
    DataContext,
    state => state.dataStorage
  );

  if (dataStorage) {
    console.log(dataStorage);
  }

  return (
    <>
      <GlobalStyle />
      <AppBox>
        {/* <Test /> */}
        <Navbar isAnimated={dataStorage ? true : false}>
          <Form />
          {/* <Start isOpaque={dataStorage ? true : false} /> */}
        </Navbar>
        <Container isOpaque={dataStorage ? true : false}>
          <List />
        </Container>
      </AppBox>
    </>
  );
};
export default hot(module)(App);

const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  /* font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* background: #fff; */
  background: #f5fcf5;

  /* background: linear-gradient(180deg, rgba(245,252,245,1) 0%, rgba(233,249,233,1) 100%); */
  /* background: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%) fixed; */
  /* background: linear-gradient(to top, #d8e476 0%, #fffbf2 100%); */
  /* height: 100%; */
  /* min-height: 100vh; */
  }
`;

const AppBox = styled.div`
  height: 100vh;
  padding: 0 15px;
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
  height: 115px;
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
  margin-top: 6px;
  opacity: ${({ isOpaque }) => (isOpaque ? 1 : 0)};
  transition: opacity 0.5s ease 0.5s;
`;

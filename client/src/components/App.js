import React, { useState } from 'react';
import List from './List/List';
import Form from './Form/Form';
import { hot } from 'react-hot-loader';
import styled, { createGlobalStyle } from 'styled-components/macro';
import AnimationContextProvider from '../contexts/AnimationContext';

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
  /* background: #f5fcf5; */
  background: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%) fixed;
  /* background: linear-gradient(to top, #d8e476 0%, #fffbf2 100%); */
  height: 100%;
  min-height: 100vh;
  }
`;

const AppBox = styled.div`
  height: 100vh;
  padding: 0 10px;
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
  height: 100px;
  transition: all 0.5s ease 0s;
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

const Loader = styled.span`
  font-size: 60px;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
  opacity: ${({ isOpaque }) => (isOpaque ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

/* const Number = styled.div`
  position: absolute; 
  font-size: 40px;
  line-height: 40px;
  right: 10px;
`; */

const App = () => {
  const [data, setData] = useState(null);
  // const [isAnimated, setIsAnimated] = useState(null);

  const handleDataUpdate = newData => {
    setData(newData);
  };
  /*   const getLoadingState = loadingState => {
    setIsAnimated(loadingState);
  }; */

  if (data) {
    console.log(data);
  }

  return (
    <>
      <GlobalStyle />
      <AppBox>
        <AnimationContextProvider>
          <Navbar isAnimated={data ? true : false}>
            <Form handleDataUpdate={handleDataUpdate} />
            {/* {data ? <Number>{data.length}</Number> : null} */}
          </Navbar>
          <Container isOpaque={data ? true : false}>
            {data ? (
              data.length ? (
                <List data={data} />
              ) : (
                <Loader isOpaque={!data.length ? true : false}>
                  Found nothing
                </Loader>
              )
            ) : null}
          </Container>
        </AnimationContextProvider>
      </AppBox>
    </>
  );
};

export default hot(module)(App);

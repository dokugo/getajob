import React, { useState } from 'react';
import VacanciesList from './components/ListContainer';
import Form from './components/Form';
import { hot } from 'react-hot-loader';
// import './App.css';
import styled, { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  body {
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
  top: ${props => (props.isAnimated === false ? '50%' : '0%')};
  transform: ${props =>
    props.isAnimated === false ? 'translateY(-50%)' : 'none'};
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
  opacity: ${props => (props.isOpaque ? 1 : 0)};
  transition: opacity 0.5s ease 0.5s;
`;

const Loader = styled.span`
  font-size: 60px;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
  opacity: ${props => (props.isOpaque ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const Number = styled.div`
  position: absolute;
  font-size: 36px;
  top: 10px;
  right: 10px;
`;

const App = () => {
  const [data, setData] = useState(null);
  const [isAnimated, setIsAnimated] = useState(null);

  const handleDataUpdate = newData => {
    setData(newData);
  };
  const getLoadingState = loadingState => {
    setIsAnimated(loadingState);
  };

  if (data) {
    console.log(data);
  }

  return (
    <>
      <GlobalStyle />
      <AppBox>
        <Navbar isAnimated={data ? true : false}>
          <Form
            handleDataUpdate={handleDataUpdate}
            getLoadingState={getLoadingState}
          />
        </Navbar>
        <Container isOpaque={data ? true : false}>
          {data ? (
            data.length ? (
              <VacanciesList data={data} isAnimated={isAnimated} />
            ) : (
              <Loader isOpaque={!data.length ? true : false}>
                Found nothing
              </Loader>
            )
          ) : null}
        </Container>
        {data ? <Number>{data.length}</Number> : null}
      </AppBox>
    </>
  );
};

export default hot(module)(App);

import React from 'react';
import styled from 'styled-components/macro';

const TestBox = styled.section`
  position: absolute;
  left: 0;
  right: 0;
  top: 230px;
  display: flex;
  justify-content: center;
  z-index: 9;
`;

const TestButton = styled.button`
  cursor: pointer;
  width: 640px;
  height: 200px;
  /* background: darkgreen; */
  background: #198619;
  color: wheat;
  font-size: 60px;
  border: none;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s;
  &:hover {
    /* background: #198619; */
    background: darkgreen;
    transform: scale(1.05, 1.05);
  }
  &:active {
    transform: scale(0.95, 0.95);
  }
  /*   &:focus {
    background: seagreen;
  } */
`;

const Test = () => {
  const testFetch = () => {
    fetch(`http://localhost:9000/api/search/null`, {
      headers: {
        'Cache-Control':
          'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 'OK') {
          console.log(response);
        }
        if (response.status === 'error') {
          console.error(response.message);
        }
      })
      .catch(error => console.log('Error: ', error));
  };
  return (
    <TestBox>
      <TestButton onClick={testFetch}>TEST</TestButton>
    </TestBox>
  );
};

export default Test;

/* const test = async () => {
  const response = await fetch(`http://localhost:9000/api/search/null`, {
    headers: {
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0'
    }
  });
  const data = await response.json();
  console.log(data);
  // console.log(data[0]);
  if (data.status === 'error') {
    console.error(data.message);
  }
}; */

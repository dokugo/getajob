import React from 'react';
import styled from 'styled-components/macro';

const Button = () => {
  return (
    <BtnBox>
      <Btn>Find</Btn>
    </BtnBox>
  );
};

export default Button;

const BtnBox = styled.div`
  margin-left: 10px;
`;

const Btn = styled.button`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
  border: 1px solid #28a745;
  background-color: #f5fcf5;
  color: #28a745;
  height: 50px;
  border-radius: 5px;
  transition: all 0.2s ease;
  font-weight: 400;
  text-align: center;
  box-sizing: border-box;
  /* width: 300px; */
  cursor: pointer;
  &:focus {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    outline: 0 none;
  }
  &:hover {
    background-color: #28a745;
    color: #f5fcf5;
  }
  &:active {
    box-shadow: 0 0 0 0.2rem rgba(12, 124, 37, 0.35);
  }

  padding: 0 25px 2px;
`;

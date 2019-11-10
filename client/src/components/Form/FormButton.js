import React from 'react';
import { IconLoading, IconWarning, IconError, IconSearch } from './FormIcons';
import styled from 'styled-components/macro';

const FormButton = ({ formState }) => {
  const { loading, warning, error } = formState;
  return (
    <Button>
      <ButtonIconContainer>
        {loading ? (
          <IconLoading />
        ) : error ? (
          <IconError type={'filled'} />
        ) : warning ? (
          <IconWarning type={'filled'} />
        ) : (
          <IconSearch />
        )}
      </ButtonIconContainer>
    </Button>
  );
};

export default FormButton;

const Button = styled.button`
  top: 0;
  right: 0;
  padding: 0;
  border: 0;
  display: flex;
  width: 65px;
  height: 65px;
  position: absolute;
  background: transparent;
  /* border-radius: 5px; */
  border-radius: 7px;
  /* border: 1px solid blue; */
  outline: 0 none;
  box-sizing: border-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    background-color 0.15s ease-in-out;
  &:focus {
    /* border-color: #28a745; */
    /* outline: 0 none; */
    /* box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); */
    /* box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) inset; */
    /* border: 0.2rem solid #28a74540; */
    /* border-radius: 5px 0px 0px 5px; */
    /* background-color: rgba(80, 204, 108, 0.25); */

    background-color: rgba(167, 167, 167, 0.2);
  }
  &:hover {
    /* background-color: #28a745; */
    /* background-color: rgba(80, 204, 108, 0.25); */
    background-color: rgba(167, 167, 167, 0.2);
  }
  &:active {
    /* box-shadow: 0 0 0 0.2rem rgba(12, 124, 37, 0.35); */
    background-color: rgba(80, 204, 108, 0.2);
  }
`;

const ButtonIconContainer = styled.span`
  /* cursor: text; */
  cursor: pointer;

  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* pointer-events: none; */
  pointer-events: unset;
`;

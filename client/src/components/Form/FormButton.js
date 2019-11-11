import React from 'react';
import { IconLoading, IconWarning, IconError, IconSearch } from './FormIcons';
import styled from 'styled-components/macro';

const FormButton = ({ formState }) => {
  const { loading, warning, error } = formState;
  return (
    <ButtonContainer
      isDisabled={formState.loading || formState.warning || formState.error}
    >
      <Button
        isDisabled={formState.loading || formState.warning || formState.error}
      >
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
    </ButtonContainer>
  );
};

export default FormButton;

const ButtonContainer = styled.div`
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  top: 0;
  right: 0;
  position: absolute;
`;

const Button = styled.button`
  padding: 0;
  border: 0;
  width: 65px;
  height: 65px;
  background-color: transparent;
  border-radius: 8px;
  outline: 0 none;
  box-sizing: border-box;
  transition: background-color 0.15s ease-in-out;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'unset')};
  cursor: ${({ isDisabled }) => (isDisabled ? 'unset' : 'pointer')};
  &:focus {
    background-color: rgba(140, 160, 120, 0.15);
  }
  &:hover {
    background-color: ${({ isDisabled }) =>
      isDisabled ? 'transparent' : 'rgba(140, 160, 120, 0.15)'};
    /* isDisabled ? 'transparent' : 'rgba(167, 167, 167, 0.15)'}; */
  }
  &:active {
    background-color: ${({ isDisabled }) =>
      isDisabled ? 'transparent' : 'rgba(78, 169, 49, 0.15)'};
  }
`;

const ButtonIconContainer = styled.span`
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import React from 'react';
import { IconLoading, IconWarning, IconError, IconSearch } from './FormIcons';
import styled from 'styled-components/macro';

const FormButton = ({ formState, focusInput }) => {
  const { loading, warning, error } = formState;

  return (
    <ButtonContainer
      isDisabled={formState.loading || formState.warning || formState.error}
    >
      <Button
        isDisabled={formState.loading || formState.warning || formState.error}
        onClick={focusInput}
        aria-label="Search button"
      >
        <ButtonIconContainer>
          {loading ? (
            <IconLoading />
          ) : error ? (
            <IconError />
          ) : warning ? (
            <IconWarning />
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
  &:hover {
    background-color: ${({ isDisabled, theme }) =>
      isDisabled ? 'transparent' : theme.button.hover};
  }
  &:focus {
    background-color: ${({ theme }) => theme.button.focus};
  }
  &:active {
    background-color: ${({ isDisabled, theme }) =>
      isDisabled ? 'transparent' : theme.button.active};
  }
`;

const ButtonIconContainer = styled.span`
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

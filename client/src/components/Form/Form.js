import React, { useState } from 'react';
import { IconWarning, IconError, IconLoading } from './FormIcons';
import styled from 'styled-components/macro';
import { AnimationContext } from '../../contexts/animationContext';
import { DataContext } from '../../contexts/dataContext';
import { useContextSelector } from 'use-context-selector';

/* import {
  FormItem,
  InputContainer,
  InputBox,
  InputItem,
  Input,
  IconContainer,
  Tooltip,
  ButtonBox,
  Button
} from './FormStyle.js';
 */

const Form = () => {
  // console.log('Form re-render');

  // const { toggleAnimation } = useContext(AnimationContext);
  const toggleAnimation = useContextSelector(
    AnimationContext,
    state => state.toggleAnimation
  );

  // const { setDataStorage } = useContext(DataContext);
  const setDataStorage = useContextSelector(
    DataContext,
    state => state.setDataStorage
  );

  const [inputData, setInputData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationState, setValidationState] = useState(null);

  const handleInputChange = e => {
    if (e.target.value.length < 1 || e.target.value.trim().length < 1) {
      setInputData(null);
      setValidationState('warning');
      return;
    }
    setValidationState(null);
    setInputData(e.target.value);
  };

  const handleRequest = e => {
    e.preventDefault();

    if (inputData === null) {
      setValidationState('error');
      return;
    } else {
      toggleAnimation(false);
      setIsLoading(true);

      console.log(inputData);

      fetch(`http://localhost:9000/api/search/${inputData}`)
        .then(response => response.json())
        .then(data => {
          setDataStorage(data);

          toggleAnimation(true);
          setIsLoading(false);
        })
        .catch(e => console.log('Error: ', e));
    }
  };

  return (
    <FormItem onSubmit={handleRequest}>
      <InputContainer>
        <InputBox>
          <InputItem>
            <Input
              onChange={handleInputChange}
              validationState={validationState}
              type="text"
              name="search-request"
              placeholder="Search..."
              autoComplete="on"
            />
            <IconContainer>
              <IconError
                type={'filled'}
                show={validationState === 'error' ? true : false}
              />
              <IconWarning
                type={'filled'}
                show={validationState === 'warning' ? true : false}
              />
              <IconLoading show={isLoading ? true : false} />
            </IconContainer>
          </InputItem>
          {validationState ? (
            <Tooltip validationState={validationState}>
              {validationState === 'warning'
                ? `Search request can't be empty.`
                : validationState === 'error'
                ? `Can't send empty request.`
                : null}
            </Tooltip>
          ) : null}
        </InputBox>
        <ButtonBox>
          <Button>Find</Button>
        </ButtonBox>
      </InputContainer>
    </FormItem>
  );
};

export default Form;

const FormItem = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 640px;
  @media (max-width: 670px) {
    width: 100%;
  }
`;

const InputBox = styled.div`
  position: relative;

  width: 100%;
`;

const InputItem = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
  font-weight: 400;
  /* width: 300px; */
  width: 100%;
  height: 50px;
  padding: 0px 12px;
  box-sizing: border-box;
  background-color: #f5fcf5;
  border-radius: 5px;
  color: #464646;
  padding-right: 36px;
  padding-bottom: 2px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ validationState }) => {
    if (validationState === 'warning') {
      return '#faad14';
    } else if (validationState === 'error') {
      return '#dc3545';
    } else return '#28a745';
  }};
  &:focus {
    outline: 0 none;
    border-color: ${({ validationState }) => {
      if (validationState === 'warning') {
        return 'rgba(250, 166, 26, 0.749)';
      } else if (validationState === 'error') {
        return '#dc3545';
      } else return '#28a745';
    }};
    box-shadow: ${({ validationState }) => {
      if (validationState === 'warning') {
        return '0 0 0 0.2rem rgba(250, 166, 26, 0.3)';
      } else if (validationState === 'error') {
        return '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
      } else return '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
    }};
  }
`;

const IconContainer = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  margin-top: -12.5px;
  width: 25px;
  height: 25px;
  cursor: text;
`;

const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 5px 5px;
  color: ${({ validationState }) =>
    validationState === 'warning'
      ? '#b37700'
      : validationState === 'error'
      ? '#dc3545'
      : null};
`;

const ButtonBox = styled.div`
  margin-left: 10px;
`;

const Button = styled.button`
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

  padding: 0 25px 2px;
`;

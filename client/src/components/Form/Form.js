import React, { useState, useContext } from 'react';
import { IconWarning, IconError, IconLoading } from './FormIcons';

import {
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
import { AnimationContext } from '../../contexts/AnimationContext';

const Form = ({ handleDataUpdate }) => {
  const { toggleAnimation } = useContext(AnimationContext);

  const [inputData, setInputData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputState, setInputState] = useState(null);

  const handleInputChange = e => {
    // console.log('state: ', inputData);
    if (e.target.value.length < 1 || e.target.value.trim().length < 1) {
      console.log('Form validation error');
      setInputState('warning');
      setInputData(null);
      return;
    }
    setInputState(null);
    setInputData(e.target.value);
    // console.log(inputData);
  };

  const handleRequest = e => {
    console.log(inputData);
    e.preventDefault();

    if (inputData === null) {
      console.log('Fetch cancelled');
      setInputState('error');
      return;
    } else {
      setInputState(null);
      setIsLoading(true);

      toggleAnimation(false);
      // getLoadingState(false);
      fetch(`http://localhost:9000/api/search/${inputData}`)
        .then(response => response.json())
        .then(data => {
          toggleAnimation(true);
          // getLoadingState(true);
          handleDataUpdate(data);
          console.log('Data successfully updated');
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
              inputState={inputState}
              type="text"
              name="search-request"
              placeholder="Search..."
              autoComplete="on"
            />
            <IconContainer>
              <IconError
                type={'filled'}
                show={inputState === 'error' ? true : false}
              />
              <IconWarning
                type={'filled'}
                show={inputState === 'warning' ? true : false}
              />
              <IconLoading show={isLoading ? true : false} />
            </IconContainer>
          </InputItem>
          {inputState ? (
            <Tooltip inputState={inputState}>
              {inputState === 'warning'
                ? `Search request can't be empty.`
                : inputState === 'error'
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

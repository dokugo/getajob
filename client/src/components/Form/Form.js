import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { AnimationContext } from '../../contexts/animationContext';
import { DataContext } from '../../contexts/dataContext';
import { useContextSelector } from 'use-context-selector';
import FormButton from './FormButton';

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
  const [formState, setFormState] = useState({
    loading: false,
    warning: false,
    error: false
  });

  const handleInputChange = e => {
    if (e.target.value.length < 1 || e.target.value.trim().length < 1) {
      setInputData(null);
      setFormState({ ...formState, warning: true, error: false });
      return;
    }
    setInputData(e.target.value.trim());
    setFormState({ ...formState, warning: false, error: false });
  };

  const handleRequest = e => {
    e.preventDefault();

    if (formState.loading) {
      return;
    }

    if (inputData === null) {
      setFormState({ ...formState, warning: false, error: true });
      return;
    } else {
      toggleAnimation(false);
      setFormState({ ...formState, loading: true });

      console.log(inputData);

      fetch(`http://localhost:9000/api/search/${inputData}`, {
        headers: {
          'Cache-Control':
            'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          Pragma: 'no-cache',
          Expires: '0'
        }
      })
        .then(response => response.json())
        .then(response => {
          if (response.status === 'error') {
            console.error(response.message);
          }
          if (response.data) {
            setDataStorage(response.data);
          } else {
            setDataStorage([]);
          }
          /* if (!Array.isArray(data) || !data.length) {
            setDataStorage([]);
          } else {
            setDataStorage(data);
          } */
          toggleAnimation(true);
          setFormState({ ...formState, loading: false });
        })
        .catch(error => console.log('Error: ', error));
    }
  };

  return (
    <FormItem onSubmit={handleRequest}>
      <InputContainer>
        <InputBox>
          <InputItem>
            <Input
              onChange={handleInputChange}
              formState={formState}
              type="search"
              title="Search something..."
              name="search-request"
              placeholder="Search..."
              autoComplete="off"
            />
            <FormButton formState={formState} />
          </InputItem>

          <Tooltip formState={formState}>
            {formState.warning
              ? `Search request can't be empty.`
              : formState.error
              ? `Can't send empty request.`
              : null}
          </Tooltip>
        </InputBox>
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

  /* display: flex; */
  /* align-items: center; */
`;

const Input = styled.input`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 24px;
  font-weight: 400;
  width: 100%;
  height: 65px;
  padding: 0px 20px;
  padding-right: 70px;
  padding-bottom: 2.5px;
  box-sizing: border-box;
  /* background-color: #f5fcf5; */
  background-color: #e5f0e5;
  border-radius: 8px;
  color: #464646;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
/*   border-color: ${({ formState }) => {
  if (formState === 'warning') {
    return '#faad14';
  } else if (formState === 'error') {
    return '#dc3545';
  } else return 'transparent';
}}; */
outline: 0 none;
  &:focus {
/*     border-color: ${({ formState }) => {
  if (formState === 'warning') {
    return 'rgba(250, 166, 26, 0.749)';
  } else if (formState === 'error') {
    return '#dc3545';
  } else return 'transparent';
}}; */
    box-shadow: ${({ formState }) => {
      if (formState.warning) {
        return '0 0 0 0.2rem rgba(250, 166, 26, 0.3)';
      } else if (formState.error) {
        return '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
      } else return '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
    }};
  }
::-webkit-search-decoration,
::-webkit-search-cancel-button,
::-webkit-search-results-button,
::-webkit-search-results-decoration {
  display: none; 
}
`;

const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 5px 5px;
  color: ${({ formState }) =>
    formState.warning ? '#b37700' : formState.error ? '#dc3545' : null};
`;

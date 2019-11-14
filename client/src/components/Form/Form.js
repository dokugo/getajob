import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { AnimationContext } from '../../contexts/animationContext';
import { DataContext } from '../../contexts/dataContext';
import { useContextSelector } from 'use-context-selector';
import FormButton from './FormButton';

/* import {
  FormItem,
  InputContainer,
  InputBox,
  InputField,
  Input,
  IconContainer,
  Tooltip,
  ButtonBox,
  Button
} from './FormStyle.js';
 */

const Form = () => {
  // console.log('Form re-render');

  // const { setListAnimation } = useContext(AnimationContext);
  const setListAnimation = useContextSelector(
    AnimationContext,
    state => state.setListAnimation
  );

  // const { setDataStorage } = useContext(DataContext);
  const setDataStorage = useContextSelector(
    DataContext,
    state => state.setDataStorage
  );

  const [inputData, setInputData] = useState(null);
  const [formState, setFormState] = useState({
    default: true,
    loading: false,
    warning: false,
    error: false
  });

  const handleInputChange = e => {
    if (e.target.value.length < 1 || e.target.value.trim().length < 1) {
      setInputData(null);
      setFormState({
        ...formState,
        warning: true,
        error: false,
        default: false
      });
    } else {
      setInputData(e.target.value.trim());
      setFormState({
        ...formState,
        warning: false,
        error: false,
        default: false
      });
    }
  };

  const inputRef = createRef();
  const focusInput = () => {
    if (formState.default) {
      inputRef.current.focus();
    }
  };

  const handleRequest = e => {
    e.preventDefault();

    if (!formState.default && !formState.warning) {
      inputRef.current.blur();
    }

    if (formState.loading) {
      return;
    }

    if (inputData === null) {
      setFormState({ ...formState, warning: false, error: true });
      return;
    } else {
      setListAnimation(false);
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

          setListAnimation(true);
          setFormState({ ...formState, loading: false, default: false });
        })
        .catch(error => console.log('Error: ', error));
    }
  };

  return (
    <FormItem onSubmit={handleRequest}>
      <InputField>
        <Input
          onChange={handleInputChange}
          formState={formState}
          ref={inputRef}
          type="search"
          title="Search"
          name="search-request"
          placeholder="Search..."
          autoComplete="off"
        />
        <FormButton formState={formState} focusInput={focusInput} />
      </InputField>

      <Tooltip formState={formState}>
        {formState.warning
          ? `Search request can't be empty.`
          : formState.error
          ? `Can't send empty request.`
          : null}
      </Tooltip>
    </FormItem>
  );
};

export default Form;

const FormItem = styled.form`
  @media (max-width: 660px) {
    width: 100%;
  }
`;

const InputField = styled.div`
  position: relative;
  width: 640px;
  min-width: 100%;
  @media (max-width: 660px) {
    width: 100%;
  }
`;

const autofill = keyframes`
  to {
    color: #464646;
    background: #e5f0e5;
  }
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
  background-color: #e5f0e5;
  border-radius: 8px;
  color: #464646;
  transition: box-shadow 0.15s ease-in-out;
  /* border-style: solid; */
  /* border-color: transparent; */
  border-width: 0px;
  outline: 0 none;
  &:focus {
    box-shadow: ${({ formState }) =>
      formState.warning
        ? '0 0 0 3px rgba(232, 145, 15, 0.35)'
        : formState.error
        ? '0 0 0 3px rgba(220, 53, 69, 0.35)'
        : '0 0 0 3px rgba(78, 169, 49, 0.35)'};
  }

  /* rgba(40, 167, 69, 0.35) */

  /* rgba(68, 160, 89, 0.35) */
  /* rgba(78, 169, 49, 0.35) */
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    display: none;
  }
  :-webkit-autofill {
    animation-name: ${autofill};
    animation-fill-mode: both;
  }
  /*   ::placeholder {
    opacity: 0.65;
    transition: opacity 0.15s ease-in-out;
  }
  &:hover {
    ::placeholder {
      opacity: 0.35;
    }
  } */
`;

const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 5px 5px;
  color: ${({ formState }) =>
    formState.warning ? '#b37700' : formState.error ? '#dc3545' : null};
`;

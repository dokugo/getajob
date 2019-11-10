import React, { useState } from 'react';
import { IconLoading, IconWarning, IconError, IconSearch } from './FormIcons';
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
  const [formState, setFormState] = useState({
    loading: false,
    warning: false,
    error: false
  });

  const handleInputChange = e => {
    if (e.target.value.length < 1 || e.target.value.trim().length < 1) {
      setInputData(null);
      setFormState({ ...formState, warning: true });

      return;
    }
    setFormState({ ...formState, warning: false, error: false });
    setInputData(e.target.value);
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
              type="text"
              name="search-request"
              placeholder="Search..."
              autoComplete="off"
            />
            <SearchButton>
              <SearchIconContainer>
                {formState.loading ? (
                  <IconLoading />
                ) : formState.error ? (
                  <IconError type={'filled'} />
                ) : formState.warning ? (
                  <IconWarning type={'filled'} />
                ) : (
                  <IconSearch />
                )}
              </SearchIconContainer>
            </SearchButton>
          </InputItem>

          <Tooltip formState={formState}>
            {formState.warning
              ? `Search request can't be empty.`
              : formState.error
              ? `Can't send empty request.`
              : null}
          </Tooltip>
        </InputBox>
        {/* <Button /> */}
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
  /* width: 300px; */
  width: 100%;
  height: 65px;
  padding: 0px 15px;
  padding-right: 70px;
  /* padding-left: 45px; */
  padding-bottom: 2.5px;

  box-sizing: border-box;
  /* background-color: #f5fcf5; */
  background-color: #e5f0e5;
  border-radius: 8px;
  /* border-radius: 10px; */
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
`;

const IconContainer = styled.span`
  position: absolute;
  right: 8px;
  /* top: calc(50% -17.5px); */
  /* margin-top: 17.5px; */
  margin-top: 15px;
  width: 35px;
  height: 35px;
  /* cursor: text; */
  pointer-events: none;
`;

const SearchIconContainer = styled(IconContainer)`
  cursor: pointer;
  right: unset;
  top: unset;
  margin-top: 0;
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: unset;
  position: unset;
`;

const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 5px 5px;
  color: ${({ formState }) =>
    formState.warning ? '#b37700' : formState.error ? '#dc3545' : null};
`;

const SearchButton = styled.button`
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

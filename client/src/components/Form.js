import React, { useState } from 'react';
import IconError from './icons/IconError';
import IconWarning from './icons/IconWarning';
import IconLoading from './icons/IconLoading';
// import IconSearch from './icons/IconSearch';
// import NProgress from 'nprogress';

import styled from 'styled-components';

const InputField = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 640px;
  /* margin-bottom: 10px; */
`;

const Form = ({ handleDataUpdate, getLoadingState }) => {
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
      getLoadingState(false);
      fetch(`http://localhost:9000/api/search/${inputData}`)
        .then(response => response.json())
        .then(data => {
          getLoadingState(true);
          handleDataUpdate(data);
          console.log('Data successfully updated');
          setIsLoading(false);
        })
        .catch(e => console.log('Error: ', e));
    }
  };

  const inputModifier = `input-${inputState}`;

  /*   const icon =
    inputState === 'error' ? (
      <IconError type={'filled'} />
    ) : inputState === 'warning' ? (
      <IconWarning type={'filled'} />
    ) : null; */

  const tooltip =
    inputState === 'warning'
      ? `Search request can't be empty.`
      : inputState === 'error'
      ? `Can't send empty request.`
      : null;

  return (
    <form onSubmit={handleRequest}>
      <InputField>
        <div className="input-box">
          <div className="search">
            <input
              onChange={handleInputChange}
              className={`request-input ${inputModifier}`}
              type="text"
              name="request"
              placeholder="Search..."
              autoComplete="on"
            />
            <span className={`input-icon`}>
              <IconError
                type={'filled'}
                animate={inputState === 'error' ? 'error-icon--show' : ''}
              />
              <IconWarning
                type={'filled'}
                animate={inputState === 'warning' ? 'error-icon--show' : ''}
              />
              <IconLoading animate={isLoading ? 'error-icon--show' : ''} />
            </span>
          </div>
          {inputState ? (
            <div className={`search-tooltip search-tooltip--${inputState}`}>
              {tooltip}
            </div>
          ) : null}
        </div>
        <button className="request-btn">Find</button>
      </InputField>
    </form>
  );
};

export default Form;

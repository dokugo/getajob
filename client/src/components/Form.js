import React, { useState } from 'react';
import IconError from './IconError';
import IconWarning from './IconWarning';
import IconLoading from './IconLoading';
// import IconSearch from './IconSearch';
// import NProgress from 'nprogress';

const Form = ({ handleDataUpdate }) => {
  const [inputData, setInputData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputState, setInputState] = useState(null);

  const handleInputChange = e => {
    console.log('state: ', inputData);
    if (e.target.value.length < 1 || e.target.value.trim().length < 1) {
      console.log('Form validation error');
      // setIsInvalidRequest(false);
      // setIsWarnedRequest(true);
      setInputState('warning');
      setInputData(null);
      return;
    }
    // setIsWarnedRequest(false);
    // setIsInvalidRequest(false);
    setInputState(null);
    setInputData(e.target.value);
    // console.log(inputData);
  };
  /*   async function handleRequest() {
    console.log('request');
    console.log(inputData);
    const response = await fetch('http://localhost:9000/api/crawling', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputData })
    });
    console.log(response);
  } */

  const handleRequest = e => {
    console.log(inputData);
    e.preventDefault();

    if (inputData === null) {
      console.log('Fetch cancelled');
      // setIsInvalidRequest(true);
      setInputState('error');
      return;
    } else {
      // setIsInvalidRequest(false);
      setInputState(null);
      // NProgress.start();
      setIsLoading(true);

      fetch(`http://localhost:9000/api/search/${inputData}`)
        .then(response => response.json())
        .then(data => {
          handleDataUpdate(data);
          console.log('Data successfully updated');

          // NProgress.done();
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

  return (
    <form onSubmit={handleRequest}>
      <div className="input-field">
        <div className="input-box">
          {/* <span className={`input-icon--search`}>
            <IconSearch />
          </span> */}
          <input
            onChange={handleInputChange}
            className={`request-input ${inputModifier}`}
            type="text"
            name="request"
            placeholder="Search"
            autoComplete="off"
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
        <button className="request-btn">Find</button>
      </div>
    </form>
  );
};

export default Form;

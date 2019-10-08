import React, { useState } from 'react';
import NProgress from 'nprogress';

const Form = ({ handleDataUpdate }) => {
  const [inputData, setInputData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidRequest, setIsInvalidRequest] = useState(false);
  const [isWarnedRequest, setIsWarnedRequest] = useState(false);

  const handleInputChange = e => {
    console.log('state: ', inputData);
    if (e.target.value.length < 1 || e.target.value.trim().length < 1) {
      console.log('Form validation error');
      setIsInvalidRequest(false);
      setIsWarnedRequest(true);
      setInputData(null);
      return;
    }
    setIsWarnedRequest(false);
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
      setIsInvalidRequest(true);
      return;
    } else {
      setIsInvalidRequest(false);
      NProgress.start();
      setIsLoading(true);

      fetch(`http://localhost:9000/api/search/${inputData}`)
        .then(response => response.json())
        .then(data => {
          handleDataUpdate(data);
          console.log('Data successfully updated');

          NProgress.done();
          setIsLoading(false);
        })
        .catch(e => console.log('Error: ', e));
    }
  };

  const inputError = isInvalidRequest ? 'input-error' : '';
  const inputWarning = isWarnedRequest ? 'input-warning' : '';

  const icon = isInvalidRequest ? (
    <svg
      className={`error-icon ${isInvalidRequest ? 'error-icon--show' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
    >
      <path
        fill="#dc3545"
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
      />
      <path
        fill="#fff3ed"
        d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-32 156c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
      />
      <path
        fill="#dc3545"
        d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8zm-24 112a48 48 0 1 0 96 0 48 48 0 1 0-96 0z"
      />
    </svg>
  ) : isWarnedRequest ? (
    <svg
      className={`error-icon ${isWarnedRequest ? 'error-icon--show' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
    >
      <path
        fill="#faad14"
        d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"
      />
      <path
        fill="#FFCE6D"
        d="M172.2 828.1h679.6L512 239.9 172.2 828.1zM560 720a48.01 48.01 0 01-96 0 48.01 48.01 0 0196 0zm-16-304v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8z"
      />
      <path
        fill="#faad14"
        d="M464 720a48 48 0 1096 0 48 48 0 10-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8z"
      />
    </svg>
  ) : null;
  /*   const handleRequest = e => {
    e.preventDefault();
    NProgress.start();
    setIsLoading(true);
    fetch('http://localhost:9000/api/crawling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
      .then(res => res.json())
      .then(data => {
        handleDataUpdate(data);
        console.log('Data successfully updated');
        NProgress.done();

        setIsLoading(false);
      });
  }; */

  return (
    <form onSubmit={handleRequest}>
      <div className="input-field">
        <div className="input-box">
          <input
            onChange={handleInputChange}
            className={`request-input ${inputError} ${inputWarning}`}
            type="text"
            name="request"
            autoComplete="on"
          />
          <span className="input-icon">{icon}</span>
        </div>
        <button className="request-btn">
          {isLoading ? 'Loading...' : 'Fetch'}
        </button>
      </div>
    </form>
  );
};

export default Form;

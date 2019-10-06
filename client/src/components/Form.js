import React, { useState } from 'react';
import NProgress from 'nprogress';

const Form = ({ handleDataUpdate }) => {
  const [inputData, setInputData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidRequest, setIsInvalidRequest] = useState(false);

  const handleInputChange = e => {
    console.log('state: ', inputData);
    if (e.target.value.length < 1 || e.target.value.trim().length < 1) {
      console.log('Form validation error');
      setIsInvalidRequest(true);
      setInputData(null);
      return;
    }
    setIsInvalidRequest(false);
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
            className={`request-input ${isInvalidRequest ? 'input-error' : ''}`}
            type="text"
            name="request"
          />
          <span className="input-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`error-icon ${
                isInvalidRequest ? 'error-icon--show' : ''
              }`}
              viewBox="0 0 1024 1024"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" />
            </svg>
          </span>
        </div>
        <button className="request-btn">
          {isLoading ? 'Loading...' : 'Fetch'}
        </button>
      </div>
    </form>
  );
};

export default Form;

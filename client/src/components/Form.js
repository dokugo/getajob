import React, { useState } from 'react';
import NProgress from 'nprogress';

const Form = ({ handleDataUpdate }) => {
  const [inputData, setInputData] = useState({ newCrawlingRequest: null });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = e => {
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
    e.preventDefault();

    NProgress.start();
    setIsLoading(true);

    fetch(`http://localhost:9000/api/search/${inputData}`)
      .then(response => response.json())
      .then(data => {
        handleDataUpdate(data);
        console.log('Data successfully updated');

        NProgress.done();
        setIsLoading(false);
      });
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
        <input
          onChange={handleInputChange}
          className="request-input"
          type="text"
          name="request"
        />
        <button className="request-btn">
          {isLoading ? 'Loading...' : 'Fetch'}
        </button>
      </div>
    </form>
  );
};

export default Form;

import React, { useState } from 'react';

const Form = ({ handleDataUpdate }) => {
  const [inputData, setInputData] = useState({ newCrawlingRequest: null });
  const [isLoading, setIsLoading] = useState('Fetch');

  const handleInputChange = e => {
    setInputData({ newCrawlingRequest: e.target.value });
    //console.log(inputData);
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
    setIsLoading('Loading...');
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
      });
    // setIsLoading('Fetch');
  };

  return (
    <form onSubmit={handleRequest}>
      <div className="input-field">
        <input
          onChange={handleInputChange}
          className="request-input"
          type="text"
        />
        <button className="request-btn">{isLoading}</button>
      </div>
    </form>
  );
};

export default Form;

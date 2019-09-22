import React, { useState } from 'react';

const Form = () => {
  const [inputData, setInputData] = useState({ newCrawlingRequest: null });

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

  const handleRequest = () => {
    fetch('http://localhost:9000/api/crawling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
      .then(res => res.json())
      .then(data => console.log('Success: ', data));
  };
  return (
    <div className="input-field">
      <input
        onChange={handleInputChange}
        className="request-input"
        type="text"
      />
      <button onClick={handleRequest} className="request-btn">
        Fetch
      </button>
    </div>
  );
};

export default Form;

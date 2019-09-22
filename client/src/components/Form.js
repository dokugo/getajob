import React from 'react';

const Form = () => {
  const handleRequest = () => {
    console.log('request');
  };
  return (
    <div className="input-field">
      <input className="request-input" type="text" />
      <button onClick={handleRequest} className="request-btn">
        Fetch
      </button>
    </div>
  );
};

export default Form;

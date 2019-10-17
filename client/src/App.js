import React, { useState } from 'react';
import VacanciesList from './components/ListContainer';
import Form from './components/Form';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [isAnimated, setIsAnimated] = useState(null);

  const handleDataUpdate = newData => {
    setData(newData);
  };
  const getLoadingState = loadingState => {
    setIsAnimated(loadingState);
  };

  if (data) {
    console.log(data);
  }

  return (
    <div className="app">
      <nav className={`navbar ${data ? 'navbar--top' : ''}`}>
        <Form
          handleDataUpdate={handleDataUpdate}
          getLoadingState={getLoadingState}
        />
      </nav>
      <main className={`container ${data ? 'container--top' : ''}`}>
        {data ? (
          data.length ? (
            <VacanciesList data={data} isAnimated={isAnimated} />
          ) : (
            <div className="loader">Found nothing</div>
          )
        ) : null}
      </main>
      {data ? <div className="number">{data.length}</div> : null}
    </div>
  );
};

export default App;

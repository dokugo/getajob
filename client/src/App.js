import React, { useState } from 'react';
import VacanciesList from './components/VacanciesList';
import Form from './components/Form';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  const handleDataUpdate = newData => {
    setData(newData);
  };

  if (data) {
    console.log(data);
  }

  return (
    <div className="App">
      <nav className={`navbar ${data ? 'navbar--top' : ''}`}>
        <Form handleDataUpdate={handleDataUpdate} />
      </nav>
      <main className={`container ${data ? 'container--top' : ''}`}>
        {data ? (
          data.length ? (
            <VacanciesList data={data} />
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

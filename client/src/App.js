import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Vacancy from './components/Vacancy';
import Navbar from './components/Navbar';
import Form from './components/Form';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:9000/api')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  /*   const handleFetch = () => {
    fetch('http://localhost:9000/api')
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        // console.log(response[0])
        setData(response);
      })
      .catch(err => {
        console.log(err);
      });
  }; */

  if (data) {
    //console.log(data);
  }

  if (data) {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Form />
          <main className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Dashboard {...props} data={data} />}
              />
              <Route
                path="/vacancy/:id"
                render={props => <Vacancy {...props} data={data} />}
              />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  } else {
    return <div className="loader">Loading...</div>;
  }
}

export default App;

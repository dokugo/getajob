import React, { useState /* useEffect */ } from 'react';
import { BrowserRouter, Route /* Switch */ } from 'react-router-dom';
import Dashboard from './components/Dashboard';
// import Vacancy from './components/Vacancy';
/* import Navbar from './components/Navbar';
 */ import Form from './components/Form';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  const handleDataUpdate = newData => {
    setData(newData);
  };

  /*   useEffect(() => {
    fetch('http://localhost:9000/api')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); */

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
    console.log(data);
  }

  return (
    <BrowserRouter>
      <div className="App">
        {/* <div className={`test ${data ? 'test-animate' : ''}`}></div> */}
        {/* <Navbar /> */}
        <nav className={`navbar ${data ? 'navbar--top' : ''}`}>
          <Form handleDataUpdate={handleDataUpdate} />
        </nav>
        <main className={`container ${data ? 'container--top' : ''}`}>
          {/* <Switch> */}
          {data ? (
            data.length ? (
              <Route
                exact
                path="/"
                render={props => <Dashboard {...props} data={data} />}
              />
            ) : (
              <div className="loader">Found nothing</div>
            )
          ) : null}

          {/*               <Route
                path="/vacancy/:id"
                render={props => <Vacancy {...props} data={data} />}
              />
            </Switch> */}
        </main>
        {data ? <div className="number">{data.length}</div> : null}
      </div>
    </BrowserRouter>
  );
}

export default App;

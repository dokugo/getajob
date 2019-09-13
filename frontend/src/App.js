import React, { useState } from 'react';
import './App.css';

function App() {
  const [jobLinks, setJobLinks] = useState(null)

  const handleFetch = () => {
    fetch('http://localhost:9000/api')
      .then(response =>
        response.json()
      ).then((data) => {
        //console.log(data)
        //console.log(data[0])
        setJobLinks(data)
      })
  }

  if (jobLinks) {
    console.log(jobLinks)
  }

  if (true) {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={handleFetch} className={"fetchBtn"}>
            Fetch
          </button>
          {jobLinks ? (
            jobLinks.map(item => {
              return (
                <a
                  className="App-link"
                  href={item.link}
                  target="_blank"
                  key={item.link}
                >
                  {item.link}
                </a>
              )
            })
          ) : null}
        </header>
      </div>
    )
  } else {
    return null
  }
}

export default App;

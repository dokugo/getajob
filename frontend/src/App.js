import React, {useState} from 'react';
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
          <a
            className="App-link"
            href={jobLinks ? jobLinks[0] : null}
            target="_blank"
            rel="noopener noreferrer"
          >
            {jobLinks ? jobLinks[0] : null}
          </a>

          <a
            className="App-link"
            href={jobLinks ? jobLinks[1] : null}
            target="_blank"
            rel="noopener noreferrer"
          >
            {jobLinks ? jobLinks[1] : null}
          </a>

        </header>
      </div>
    )
  } else {
    return null
  }
}

export default App;

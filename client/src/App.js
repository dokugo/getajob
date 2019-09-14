import React, { useState } from 'react';
import './App.css';

function App() {
  const [jobLinks, setJobLinks] = useState(null);
  const handleFetch = () => {
    fetch('http://localhost:9000/api')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        // console.log(data[0])
        setJobLinks(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (jobLinks) {
    console.log(jobLinks);
  }

  if (true) {
    return (
      <main className="container">
        <button onClick={handleFetch} className="fetchBtn">
          Fetch
        </button>
        {jobLinks
          ? jobLinks.map(item => {
              return (
                <div
                  className="link-item"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.link}
                >
                  {item.link}
                </div>
              );
            })
          : null}
      </main>
    );
  } else {
    return null;
  }
}

export default App;

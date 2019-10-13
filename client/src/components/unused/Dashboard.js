import React from 'react';
import VacanciesList from '../VacanciesList';

const Dashboard = props => {
  return (
    <React.Fragment>
      {/* <button onClick={props.handleFetch} className="fetchBtn">
        Fetch
      </button> */}

      <VacanciesList data={props.data} />
    </React.Fragment>
  );
};

export default Dashboard;

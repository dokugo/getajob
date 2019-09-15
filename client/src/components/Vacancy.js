import React from 'react';

const Vacancy = props => {
  const thisVacancyData = props.data.filter(item => {
    return item.id === props.match.params.id;
  });
  const data = thisVacancyData[0];
  if (data) {
    return (
      <div className="link-item">
        <div className="link-item__box">
          <div className="link-item__data link-item__title">{data.title}</div>
          <div className="link-item__data link-item__title">
            {data.compensation}
          </div>
          <div className="link-item__data link-item__title">
            {data.employer}
          </div>
          <div className="link-item__data link-item__date">{data.date}</div>
          <div className="link-item__data link-item__date">{data.link}</div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Vacancy;

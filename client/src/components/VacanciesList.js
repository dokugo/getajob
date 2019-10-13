import React from 'react';

const VacanciesList = props => {
  const { data } = props;
  return (
    <section className="box">
      {data
        ? data.map(item => (
            <a
              href={item.link}
              key={item.id}
              className="link-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="link-item__box">
                <div className="link-item__row">
                  <div className="link-item__data link-item__data-title">
                    {item.title}
                  </div>
                  <div className="link-item__data link-item__data-date">
                    {item.date}
                  </div>
                </div>
                <div className="link-item__data link-item__data-employer">
                  {item.employer}
                </div>
                <div
                  className={
                    'link-item__data link-item__data-compensation' +
                    (item.compensation === 'Зарплата не указана'
                      ? ' no-data'
                      : '')
                  }
                >
                  {item.compensation}
                </div>
              </div>
            </a>
          ))
        : null}
    </section>
  );
};

export default VacanciesList;

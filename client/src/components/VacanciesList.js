import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const VacanciesList = props => {
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  // console.log(props.data);
  const { data } = props;
  return (
    <section className="box">
      {data
        ? data.map(item => (
            <Link
              to={`/vacancy/${item.id}`}
              className="link-item"
              key={item.id}
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
            </Link>
          ))
        : null}
    </section>
  );
};

export default VacanciesList;

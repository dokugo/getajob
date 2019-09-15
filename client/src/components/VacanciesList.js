import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const VacanciesList = props => {
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  // console.log(props.data);
  return (
    <section>
      {props.data
        ? props.data.map(item => {
            return (
              <Link
                to={`/vacancy/${item.id}`}
                className="link-item"
                key={item.link}
              >
                <div className="link-item__box">
                  <div className="link-item__data link-item__title">
                    {item.title}
                  </div>
                  <div className="link-item__data link-item__title">
                    {item.compensation}
                  </div>
                  <div className="link-item__data link-item__title">
                    {item.employer}
                  </div>
                  <div className="link-item__data link-item__date">
                    {item.date}
                  </div>
                  <div className="link-item__data link-item__date">
                    {item.link}
                  </div>
                </div>
              </Link>
            );
          })
        : null}
    </section>
  );
};

export default VacanciesList;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const VacanciesList = props => {
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  // console.log(props.data);
  const { data } = props;
  return (
    <section>
      {data
        ? data.map(item => (
            <Link
              to={`/vacancy/${item.id}`}
              className="link-item"
              key={item.id}
            >
              <div className="link-item__box">
                <div className="link-item__data">{item.title}</div>
                <div className="link-item__data">{item.compensation}</div>
                <div className="link-item__data">{item.employer}</div>
                <div className="link-item__data">{item.date}</div>
                <div className="link-item__data">{item.link}</div>
              </div>
            </Link>
          ))
        : null}
    </section>
  );
};

export default VacanciesList;

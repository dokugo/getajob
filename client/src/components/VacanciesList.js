import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

/* const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8
}; */

const VacanciesList = ({ data, isAnimated }) => {
  const [dataStorage, setDataStorage] = useState(null);

  const DATA_CUT = 10;

  useEffect(() => {
    // setNewData(true);
    if (data.length <= DATA_CUT) {
      setDataStorage({
        items: data,
        hasMore: false
      });
    } else {
      const dataChunk = data.slice(0, DATA_CUT);
      setDataStorage({
        items: dataChunk,
        hasMore: true
      });
    }
  }, [data]);

  const fetchMoreData = () => {
    if (dataStorage.items.length >= data.length) {
      setDataStorage({ items: [...dataStorage.items], hasMore: false });
      return;
    }
    setTimeout(() => {
      const newDataChunk = data.slice(
        dataStorage.items.length,
        dataStorage.items.length + 5
      );
      // console.log(dataStorage.items.length, dataStorage.items.length + 5);
      const newData = [...dataStorage.items, ...newDataChunk];
      setDataStorage({
        items: newData,
        hasMore: true
      });
    }, 500);
  };

  return (
    <section className="box">
      {dataStorage && dataStorage.items ? (
        <InfiniteScroll
          dataLength={dataStorage.items.length}
          next={fetchMoreData}
          hasMore={dataStorage.hasMore}
          style={{ overflow: 'visible' }}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b> · · · </b>
            </p>
          }
        >
          {dataStorage.items.map((item, index) => (
            <a
              href={item.link}
              key={item.id}
              className={`link-item ${isAnimated ? 'link-item-animate' : ''}`}
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
                <div className="link-item__row">
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
                  <div className="link-item__data link-item__data-number">
                    {`№${index + 1}`}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </InfiniteScroll>
      ) : null}
    </section>
  );
};

export default VacanciesList;

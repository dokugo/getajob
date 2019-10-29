import React, { useState, useEffect } from 'react';
import ListItemBox from './ListItemBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components/macro';

const Box = styled.section`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
`;

const List = ({ data }) => {
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
    <Box>
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
          <ListItemBox dataStorage={dataStorage} />
        </InfiniteScroll>
      ) : null}
    </Box>
  );
};

export default List;

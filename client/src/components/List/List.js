import React, { useContext } from 'react';
import ListItemBox from './ListItemBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components/macro';
import { DataContext } from '../../contexts/dataContext';

const Box = styled.section`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
`;

const List = () => {
  const { dataCache, fetchMoreData } = useContext(DataContext);
  // getItemsAmount();

  return (
    <Box>
      {dataCache && dataCache.items ? (
        <InfiniteScroll
          dataLength={dataCache.items.length}
          next={fetchMoreData}
          hasMore={dataCache.hasMore}
          style={{ overflow: 'visible' }}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b> · · · </b>
            </p>
          }
        >
          <ListItemBox dataCache={dataCache} />
        </InfiniteScroll>
      ) : null}
    </Box>
  );
};

export default List;

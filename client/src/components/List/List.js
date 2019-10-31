import React from 'react';
import ListItemBox from './ListItemBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components/macro';
import { DataContext } from '../../contexts/dataContext';
import { useContextSelector } from 'use-context-selector';

const Box = styled.section`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
`;

const List = () => {
  // const { dataCache, fetchMoreData } = useContext(DataContext);
  const dataCache = useContextSelector(DataContext, state => state.dataCache);
  const fetchMoreData = useContextSelector(
    DataContext,
    state => state.fetchMoreData
  );

  return (
    <Box>
      {dataCache && dataCache.items ? (
        <InfiniteScroll
          dataLength={dataCache.items.length}
          next={fetchMoreData}
          hasMore={dataCache.hasMore}
          style={{ overflow: 'visible' }}
          endMessage={
            dataCache.items.length ? (
              <p style={{ textAlign: 'center' }}>
                <b> · · · </b>
              </p>
            ) : null
          }
        >
          <ListItemBox dataCache={dataCache} />
        </InfiniteScroll>
      ) : null}
    </Box>
  );
};

export default List;

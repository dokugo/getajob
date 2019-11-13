import React from 'react';
import ListItemBox from './ListItemBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components/macro';
import { DataContext } from '../../contexts/dataContext';
import { useContextSelector } from 'use-context-selector';

const List = () => {
  const dataCache = useContextSelector(DataContext, state => state.dataCache);
  const fetchMoreData = useContextSelector(
    DataContext,
    state => state.fetchMoreData
  );

  return (
    <Box>
      {dataCache && dataCache.items ? (
        <ScrollingBox
          dataLength={dataCache.items.length}
          next={fetchMoreData}
          hasMore={dataCache.hasMore}
          endMessage={dataCache.items.length ? <End>· · ·</End> : null}
        >
          <ListItemBox dataCache={dataCache} />
        </ScrollingBox>
      ) : null}
    </Box>
  );
};

export default List;

const Box = styled.section`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
`;

const ScrollingBox = styled(InfiniteScroll)`
  overflow: visible !important;
`;

const End = styled.p`
  text-align: center;
  font-weight: 700;
`;

import React from 'react';
import ListBox from './ListBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled, { keyframes } from 'styled-components/macro';
import { DataContext } from '../../contexts/dataContext';
import { AnimationContext } from '../../contexts/animationContext';
import { useContextSelector } from 'use-context-selector';
import { Transition } from 'react-transition-group';

const List = () => {
  const dataCache = useContextSelector(DataContext, state => state.dataCache);

  const fetchMoreData = useContextSelector(
    DataContext,
    state => state.fetchMoreData
  );

  const listAnimation = useContextSelector(
    AnimationContext,
    state => state.listAnimation
  );

  return (
    <Transition in={!listAnimation} timeout={1000}>
      {state => (
        <Box state={state}>
          {dataCache && dataCache.items && dataCache.items.length ? (
            <ScrollingBox
              dataLength={dataCache.items.length}
              next={fetchMoreData}
              hasMore={dataCache.hasMore}
              loader={
                <DotBox>
                  <Dot animated>·</Dot>
                  <Dot animated>·</Dot>
                  <Dot animated>·</Dot>
                </DotBox>
              }
              endMessage={
                dataCache.items.length ? (
                  <DotBox>
                    <Dot>·</Dot>
                    <Dot>·</Dot>
                    <Dot>·</Dot>
                  </DotBox>
                ) : null
              }
            >
              <ListBox dataCache={dataCache} />
            </ScrollingBox>
          ) : (
            <NoData>Found nothing</NoData>
          )}
        </Box>
      )}
    </Transition>
  );
};

export default List;

const Box = styled.section`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  transition: 1s;
  transform: ${({ state }) =>
    state === 'entering'
      ? 'translateY(50px)'
      : state === 'entered'
      ? 'translateY(50px)'
      : state === 'exiting'
      ? 'translateY(0)'
      : state === 'exited'
      ? 'translateY(0)'
      : null};
  opacity: ${({ state }) =>
    state === 'entering'
      ? 0
      : state === 'entered'
      ? 0
      : state === 'exiting'
      ? 1
      : state === 'exited'
      ? 1
      : null};
/*   background: ${({ state }) =>
  state === 'entering'
    ? 'red'
    : state === 'entered'
    ? 'blue'
    : state === 'exiting'
    ? 'yellow'
    : state === 'exited'
    ? 'green'
    : null}; */
`;

const ScrollingBox = styled(InfiniteScroll)`
  overflow: visible !important;
`;

const blink = keyframes`
  0% {
    opacity: 0.15;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.15;
  }
`;

const DotBox = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  user-select: none;
`;

const Dot = styled.i`
  padding: 0 5px;
  animation: 1s infinite both;
  animation-name: ${({ animated }) => animated && blink};
  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }
`;

const NoData = styled.span`
  display: block;
  font-size: 36px;
  line-height: 1;
  text-align: center;
  margin: 20px 0 20px;
  color: ${({ theme }) => theme.card.title};
`;

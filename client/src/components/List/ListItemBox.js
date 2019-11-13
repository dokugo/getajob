import React from 'react';
import ListItem from './ListItem';
import styled, { keyframes } from 'styled-components/macro';
import { AnimationContext } from '../../contexts/animationContext';
import { useContextSelector } from 'use-context-selector';

const ListItemBox = ({ dataCache }) => {
  const listAnimation = useContextSelector(
    AnimationContext,
    state => state.listAnimation
  );

  return (
    <React.Fragment>
      {dataCache.items.length ? (
        dataCache.items.map((item, index) => (
          <ItemBox isAnimated={listAnimation} key={item.id}>
            <ListItem item={item} index={index} />
          </ItemBox>
        ))
      ) : (
        <ItemBox isAnimated={listAnimation}>
          <NoData>Found nothing</NoData>
        </ItemBox>
      )}
    </React.Fragment>
  );
};

export default ListItemBox;

const fadeIn = keyframes`
  0% {
    transform: translateY(33%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ItemBox = styled.article`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  animation: ${({ isAnimated }) => (isAnimated ? fadeIn : 'none')} 1s;
`;

const NoData = styled.span`
  display: block;
  font-size: 36px;
  line-height: 1;
  text-align: center;
  margin: 20px 0 20px;
  color: ${({ theme }) => theme.card.title};
`;
